import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret-token-ecoride-app';

// Étendre l'interface Request pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Non autorisé - Token manquant' });
    }

    const token = authHeader.split(' ')[1];

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Vérifier si l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'utilisateur est suspendu
    if (user.suspendedUntil && new Date(user.suspendedUntil) > new Date()) {
      return res.status(403).json({ 
        message: 'Votre compte est suspendu', 
        suspendedUntil: user.suspendedUntil 
      });
    }

    // Ajouter l'utilisateur à la requête
    req.user = { id: user.id, username: user.username, role: user.role };
    
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(401).json({ message: 'Non autorisé - Token invalide' });
  }
};

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit - Droits insuffisants' });
    }

    next();
  };
};