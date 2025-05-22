"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret-token-ecoride-app';
const authMiddleware = async (req, res, next) => {
    try {
        // Récupérer le token du header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Non autorisé - Token manquant' });
        }
        const token = authHeader.split(' ')[1];
        // Vérifier le token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
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
    }
    catch (error) {
        console.error('Erreur d\'authentification:', error);
        res.status(401).json({ message: 'Non autorisé - Token invalide' });
    }
};
exports.authMiddleware = authMiddleware;
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Non autorisé' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès interdit - Droits insuffisants' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=auth.middleware.js.map