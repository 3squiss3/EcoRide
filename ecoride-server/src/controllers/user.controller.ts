import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Interface pour typer req.user (à ajouter dans types/express.d.ts)
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: string;
    email: string;
  };
}

// Mettre à jour le profil utilisateur
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { username, email, isDriver, isPassenger } = req.body;

    // Validation basique
    if (!username || !email) {
      return res.status(400).json({ message: 'Username et email sont requis' });
    }

    // Récupérer l'utilisateur actuel pour comparer
    const currentUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!currentUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Utiliser une transaction pour les mises à jour
    const result = await prisma.$transaction(async (tx) => {
      // Mettre à jour l'utilisateur
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          username,
          email,
          isDriver,
          isPassenger
        }
      });

      // Si l'utilisateur devient conducteur ET n'était pas conducteur avant
      if (isDriver && !currentUser.isDriver) {
        // Vérifier si le profil conducteur n'existe pas déjà
        const existingProfile = await tx.driverProfile.findUnique({
          where: { userId }
        });

        if (!existingProfile) {
          await tx.driverProfile.create({
            data: {
              userId: userId,
              rating: 0,
              reviewCount: 0
            }
          });
        }
      }

      return updatedUser;
    });

    res.status(200).json({
      message: 'Profil mis à jour avec succès',
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
        credits: result.credits,
        isDriver: result.isDriver,
        isPassenger: result.isPassenger,
        role: result.role
      }
    });
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    
    // Gestion des erreurs Prisma spécifiques
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ 
          message: 'Un utilisateur avec cet email ou nom d\'utilisateur existe déjà' 
        });
      }
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir les véhicules de l'utilisateur
export const getUserVehicles = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;

    const driverProfile = await prisma.driverProfile.findUnique({
      where: { userId },
      include: {
        vehicles: {
          orderBy: { id: 'desc' } // Changé car createdAt n'existe pas dans le schema
        }
      }
    });

    if (!driverProfile) {
      return res.status(404).json({ message: 'Profil conducteur non trouvé' });
    }

    res.status(200).json({
      vehicles: driverProfile.vehicles
    });
  } catch (error) {
    console.error('Erreur récupération véhicules:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Ajouter un véhicule
export const addVehicle = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const {
      licensePlate,
      brand,
      model,
      color,
      registrationYear,
      seats,
      energy
    } = req.body;

    // Validation des données
    if (!licensePlate || !brand || !model || !color || !registrationYear || !seats || !energy) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Validation des types
    const year = parseInt(registrationYear);
    const seatCount = parseInt(seats);

    if (isNaN(year) || isNaN(seatCount)) {
      return res.status(400).json({ message: 'Année et nombre de places doivent être des nombres' });
    }

    if (year < 1950 || year > new Date().getFullYear() + 1) {
      return res.status(400).json({ message: 'Année d\'immatriculation invalide' });
    }

    if (seatCount < 1 || seatCount > 9) {
      return res.status(400).json({ message: 'Nombre de places invalide (1-9)' });
    }

    const driverProfile = await prisma.driverProfile.findUnique({
      where: { userId }
    });

    if (!driverProfile) {
      return res.status(404).json({ message: 'Profil conducteur non trouvé' });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        driverProfileId: driverProfile.id,
        licensePlate: licensePlate.toUpperCase().trim(),
        brand: brand.trim(),
        model: model.trim(),
        color: color.trim(),
        registrationYear: year,
        seats: seatCount,
        energy: energy.trim(),
        isElectric: energy.toLowerCase().includes('électrique') || energy.toLowerCase().includes('electric')
      }
    });

    res.status(201).json({
      message: 'Véhicule ajouté avec succès',
      vehicle
    });
  } catch (error) {
    console.error('Erreur ajout véhicule:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ 
          message: 'Cette plaque d\'immatriculation existe déjà' 
        });
      }
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un véhicule
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;
    const vehicleData = req.body;

    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) {
      return res.status(400).json({ message: 'ID véhicule invalide' });
    }

    // Vérifier que le véhicule appartient à l'utilisateur
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        driverProfile: {
          userId: userId
        }
      }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    // Préparer les données à mettre à jour
    const updateData: any = { ...vehicleData };
    
    if (vehicleData.registrationYear) {
      updateData.registrationYear = parseInt(vehicleData.registrationYear);
    }
    if (vehicleData.seats) {
      updateData.seats = parseInt(vehicleData.seats);
    }
    if (vehicleData.energy) {
      updateData.isElectric = vehicleData.energy.toLowerCase().includes('électrique') || 
                              vehicleData.energy.toLowerCase().includes('electric');
    }
    if (vehicleData.licensePlate) {
      updateData.licensePlate = vehicleData.licensePlate.toUpperCase().trim();
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: updateData
    });

    res.status(200).json({
      message: 'Véhicule mis à jour avec succès',
      vehicle: updatedVehicle
    });
  } catch (error) {
    console.error('Erreur mise à jour véhicule:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ 
          message: 'Cette plaque d\'immatriculation existe déjà' 
        });
      }
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un véhicule
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;

    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) {
      return res.status(400).json({ message: 'ID véhicule invalide' });
    }

    // Vérifier que le véhicule appartient à l'utilisateur
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        driverProfile: {
          userId: userId
        }
      },
      include: {
        rides: {
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED']
            }
          }
        }
      }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    // Vérifier s'il y a des trajets actifs avec ce véhicule
    if (vehicle.rides && vehicle.rides.length > 0) {
      return res.status(400).json({ 
        message: 'Impossible de supprimer un véhicule avec des trajets actifs' 
      });
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId }
    });

    res.status(200).json({
      message: 'Véhicule supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression véhicule:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour les préférences conducteur
export const updateDriverPreferences = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { smoking, animals, music, conversation, otherPreferences } = req.body;

    // Validation des types boolean
    if (typeof smoking !== 'boolean' || typeof animals !== 'boolean') {
      return res.status(400).json({ 
        message: 'Les champs smoking et animals doivent être des booléens' 
      });
    }

    const driverProfile = await prisma.driverProfile.findUnique({
      where: { userId }
    });

    if (!driverProfile) {
      return res.status(404).json({ message: 'Profil conducteur non trouvé' });
    }

    const preferences = await prisma.driverPreference.upsert({
      where: { driverProfileId: driverProfile.id },
      update: {
        smoking,
        animals,
        music: music || null,
        conversation: conversation || null,
        otherPreferences: otherPreferences || null
      },
      create: {
        driverProfileId: driverProfile.id,
        smoking,
        animals,
        music: music || null,
        conversation: conversation || null,
        otherPreferences: otherPreferences || null
      }
    });

    res.status(200).json({
      message: 'Préférences mises à jour avec succès',
      preferences
    });
  } catch (error) {
    console.error('Erreur mise à jour préférences:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir le profil complet de l'utilisateur
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        driverProfile: {
          include: {
            vehicles: true,
            preferences: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Ne pas renvoyer le mot de passe
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Erreur récupération profil:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};