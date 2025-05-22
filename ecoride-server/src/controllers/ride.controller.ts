import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Rechercher des covoiturages
export const searchRides = async (req: Request, res: Response) => {
  try {
    const {
      departureCity,
      arrivalCity,
      departureDate,
      isEcological,
      maxPrice,
      maxDuration,
      minRating
    } = req.query;
    
    let filters: any = {
      availableSeats: { gt: 0 },
      status: 'PENDING'
    };
    
    if (departureCity) {
      filters.departureCity = { contains: departureCity.toString(), mode: 'insensitive' };
    }
    
    if (arrivalCity) {
      filters.arrivalCity = { contains: arrivalCity.toString(), mode: 'insensitive' };
    }
    
    if (departureDate) {
      const date = new Date(departureDate.toString());
      filters.departureDate = {
        gte: date,
        lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) // Même jour
      };
    }
    
    if (maxPrice) {
      filters.price = { lte: parseInt(maxPrice.toString()) };
    }
    
    const rides = await prisma.ride.findMany({
      where: filters,
      include: {
        driver: {
          select: {
            id: true,
            username: true,
            driverProfile: {
              select: {
                rating: true,
                reviewCount: true
              }
            }
          }
        },
        vehicle: {
          select: {
            brand: true,
            model: true,
            isElectric: true
          }
        },
        passengerRides: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        departureDate: 'asc'
      }
    });
    
    // Appliquer filtres complexes
    let filteredRides = rides;
    
    if (isEcological === 'true') {
      filteredRides = filteredRides.filter(ride => ride.vehicle.isElectric);
    }
    
    if (minRating) {
      const minRatingValue = parseFloat(minRating.toString());
      filteredRides = filteredRides.filter(ride => {
        return (ride.driver.driverProfile?.rating || 0) >= minRatingValue;
      });
    }
    
    // Formater pour le frontend
    const formattedRides = filteredRides.map(ride => ({
      id: ride.id,
      departureCity: ride.departureCity,
      departureAddress: ride.departureAddress,
      arrivalCity: ride.arrivalCity,
      arrivalAddress: ride.arrivalAddress,
      departureDate: ride.departureDate.toISOString().split('T')[0],
      departureTime: ride.departureTime,
      arrivalTime: ride.arrivalTime,
      availableSeats: ride.availableSeats,
      price: ride.price,
      isEcological: ride.vehicle.isElectric,
      driver: {
        id: ride.driver.id,
        username: ride.driver.username,
        rating: ride.driver.driverProfile?.rating || 0,
        reviewCount: ride.driver.driverProfile?.reviewCount || 0,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ride.driver.username}`
      },
      vehicle: {
        brand: ride.vehicle.brand,
        model: ride.vehicle.model
      },
      participantCount: ride.passengerRides.length
    }));
    
    res.status(200).json(formattedRides);
  } catch (error) {
    console.error('Erreur recherche covoiturages:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche' });
  }
};

// Obtenir les détails d'un covoiturage
export const getRideDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const ride = await prisma.ride.findUnique({
      where: { id: parseInt(id) },
      include: {
        driver: {
          select: {
            id: true,
            username: true,
            driverProfile: {
              include: {
                preferences: true
              }
            }
          }
        },
        vehicle: true,
        passengerRides: {
          include: {
            passenger: {
              select: {
                id: true,
                username: true
              }
            }
          },
          where: {
            status: 'CONFIRMED'
          }
        }
      }
    });
    
    if (!ride) {
      return res.status(404).json({ message: 'Covoiturage non trouvé' });
    }
    
    // Récupérer les avis du conducteur
    const reviews = await prisma.review.findMany({
      where: {
        receiverId: ride.driver.id,
        status: 'APPROVED'
      },
      include: {
        giver: {
          select: {
            username: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    
    const formattedRide = {
      id: ride.id,
      departureCity: ride.departureCity,
      departureAddress: ride.departureAddress,
      arrivalCity: ride.arrivalCity,
      arrivalAddress: ride.arrivalAddress,
      departureDate: ride.departureDate.toISOString().split('T')[0],
      departureTime: ride.departureTime,
      arrivalTime: ride.arrivalTime,
      seats: ride.seats,
      availableSeats: ride.availableSeats,
      price: ride.price,
      status: ride.status,
      driver: {
        id: ride.driver.id,
        username: ride.driver.username,
        rating: ride.driver.driverProfile?.rating || 0,
        reviewCount: ride.driver.driverProfile?.reviewCount || 0,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ride.driver.username}`,
        reviews: reviews.map(review => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          author: review.giver.username,
          date: review.createdAt.toISOString().split('T')[0]
        }))
      },
      vehicle: {
        brand: ride.vehicle.brand,
        model: ride.vehicle.model,
        color: ride.vehicle.color,
        energy: ride.vehicle.energy,
        isElectric: ride.vehicle.isElectric,
        year: ride.vehicle.registrationYear
      },
      preferences: ride.driver.driverProfile?.preferences ? {
        smoking: ride.driver.driverProfile.preferences.smoking,
        animals: ride.driver.driverProfile.preferences.animals,
        music: ride.driver.driverProfile.preferences.music,
        conversation: ride.driver.driverProfile.preferences.conversation,
        otherPreferences: ride.driver.driverProfile.preferences.otherPreferences
      } : null,
      passengers: ride.passengerRides.map(pr => ({
        id: pr.passenger.id,
        username: pr.passenger.username,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pr.passenger.username}`
      }))
    };
    
    res.status(200).json(formattedRide);
  } catch (error) {
    console.error('Erreur détails covoiturage:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un covoiturage
export const createRide = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const {
      departureCity,
      departureAddress,
      arrivalCity,
      arrivalAddress,
      departureDate,
      departureTime,
      arrivalTime,
      seats,
      price,
      vehicleId
    } = req.body;
    
    // Vérifier que l'utilisateur est conducteur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { driverProfile: true }
    });
    
    if (!user?.isDriver || !user.driverProfile) {
      return res.status(403).json({ message: 'Vous devez être conducteur pour créer un trajet' });
    }
    
    // Vérifier que le véhicule appartient au conducteur
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: parseInt(vehicleId),
        driverProfileId: user.driverProfile.id
      }
    });
    
    if (!vehicle) {
      return res.status(400).json({ message: 'Véhicule non trouvé ou non autorisé' });
    }
    
    // Créer le covoiturage
    const ride = await prisma.ride.create({
      data: {
        driverId: userId,
        vehicleId: parseInt(vehicleId),
        departureCity,
        departureAddress,
        arrivalCity,
        arrivalAddress,
        departureDate: new Date(departureDate),
        departureTime,
        arrivalTime,
        seats: parseInt(seats),
        availableSeats: parseInt(seats),
        price: parseInt(price)
      }
    });
    
    res.status(201).json({
      message: 'Covoiturage créé avec succès',
      ride
    });
  } catch (error) {
    console.error('Erreur création covoiturage:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création' });
  }
};

// Participer à un covoiturage
export const joinRide = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    
    // Transaction pour garantir la cohérence
    const result = await prisma.$transaction(async (prisma) => {
      // Vérifier le covoiturage
      const ride = await prisma.ride.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!ride) {
        throw new Error('Covoiturage non trouvé');
      }
      
      if (ride.driverId === userId) {
        throw new Error('Vous ne pouvez pas participer à votre propre trajet');
      }
      
      if (ride.availableSeats <= 0) {
        throw new Error('Aucune place disponible');
      }
      
      // Vérifier les crédits de l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user || user.credits < ride.price) {
        throw new Error('Crédits insuffisants');
      }
      
      // Vérifier si l'utilisateur participe déjà
      const existingParticipation = await prisma.passengerRide.findFirst({
        where: {
          passengerId: userId,
          rideId: parseInt(id),
          status: { not: 'CANCELLED' }
        }
      });
      
      if (existingParticipation) {
        throw new Error('Vous participez déjà à ce trajet');
      }
      
      // Créer la participation
      await prisma.passengerRide.create({
        data: {
          passengerId: userId,
          rideId: parseInt(id),
          status: 'CONFIRMED'
        }
      });
      
      // Débiter les crédits et réduire les places
      await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: ride.price } }
      });
      
      await prisma.ride.update({
        where: { id: parseInt(id) },
        data: { availableSeats: { decrement: 1 } }
      });
      
      return { success: true };
    });
    
    res.status(200).json({
      message: 'Participation confirmée avec succès'
    });
  } catch (error) {
      let errorMessage = 'Erreur lors de la participation';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
    }
};

// Obtenir l'historique des covoiturages d'un utilisateur
export const getUserRides = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    
    // Trajets en tant que conducteur
    const driverRides = await prisma.ride.findMany({
      where: { driverId: userId },
      include: {
        vehicle: {
          select: {
            brand: true,
            model: true
          }
        },
        passengerRides: {
          include: {
            passenger: {
              select: {
                id: true,
                username: true
              }
            }
          },
          where: {
            status: 'CONFIRMED'
          }
        }
      },
      orderBy: { departureDate: 'desc' }
    });
    
    // Trajets en tant que passager
    const passengerRides = await prisma.passengerRide.findMany({
      where: { passengerId: userId },
      include: {
        ride: {
          include: {
            driver: {
              select: {
                id: true,
                username: true
              }
            },
            vehicle: {
              select: {
                brand: true,
                model: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Formater les résultats
    const formattedDriverRides = driverRides.map(ride => ({
      id: ride.id,
      type: 'driver',
      departureCity: ride.departureCity,
      arrivalCity: ride.arrivalCity,
      departureDate: ride.departureDate.toISOString().split('T')[0],
      departureTime: ride.departureTime,
      arrivalTime: ride.arrivalTime,
      status: ride.status,
      price: ride.price,
      passengersCount: ride.passengerRides.length,
      availableSeats: ride.availableSeats,
      vehicle: ride.vehicle,
      passengers: ride.passengerRides.map(pr => ({
        id: pr.passenger.id,
        username: pr.passenger.username,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pr.passenger.username}`
      }))
    }));
    
    const formattedPassengerRides = passengerRides.map(pr => ({
      id: pr.ride.id,
      type: 'passenger',
      departureCity: pr.ride.departureCity,
      arrivalCity: pr.ride.arrivalCity,
      departureDate: pr.ride.departureDate.toISOString().split('T')[0],
      departureTime: pr.ride.departureTime,
      arrivalTime: pr.ride.arrivalTime,
      status: pr.status,
      price: pr.ride.price,
      driver: {
        id: pr.ride.driver.id,
        username: pr.ride.driver.username,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pr.ride.driver.username}`,
        vehicle: pr.ride.vehicle
      }
    }));
    
    // Combiner et trier par date
    const allRides = [...formattedDriverRides, ...formattedPassengerRides]
      .sort((a, b) => new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime());
    
    res.status(200).json(allRides);
  } catch (error) {
    console.error('Erreur historique trajets:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Annuler un covoiturage
export const cancelRide = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    
    const result = await prisma.$transaction(async (prisma) => {
      const ride = await prisma.ride.findUnique({
        where: { id: parseInt(id) },
        include: {
          passengerRides: {
            where: { status: 'CONFIRMED' },
            include: {
              passenger: {
                select: { id: true, credits: true }
              }
            }
          }
        }
      });
      
      if (!ride) {
        throw new Error('Covoiturage non trouvé');
      }
      
      if (ride.driverId !== userId) {
        throw new Error('Non autorisé');
      }
      
      // Rembourser les participants
      for (const passengerRide of ride.passengerRides) {
        await prisma.user.update({
          where: { id: passengerRide.passenger.id },
          data: { credits: { increment: ride.price } }
        });
        
        await prisma.passengerRide.update({
          where: { id: passengerRide.id },
          data: { status: 'CANCELLED' }
        });
      }
      
      // Marquer le trajet comme annulé
      await prisma.ride.update({
        where: { id: parseInt(id) },
        data: { status: 'CANCELLED' }
      });
      
      return { success: true };
    });
    
    res.status(200).json({
      message: 'Covoiturage annulé avec succès'
    });
  } catch (error) {
      let errorMessage = 'Erreur lors de l\'annulation';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
    }
};