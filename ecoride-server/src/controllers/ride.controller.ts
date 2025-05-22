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
    
    // Construire les filtres
    const filters: any = {
      departureCity: departureCity ? { equals: departureCity.toString() } : undefined,
      arrivalCity: arrivalCity ? { equals: arrivalCity.toString() } : undefined,
      departureDate: departureDate ? { equals: new Date(departureDate.toString()) } : undefined,
      availableSeats: { gt: 0 },
      status: { equals: 'PENDING' }
    };
    
    if (isEcological === 'true') {
      filters.vehicle = {
        isElectric: true
      };
    }
    
    if (maxPrice) {
      filters.price = { lte: parseInt(maxPrice.toString()) };
    }
    
    // Récupérer les covoiturages correspondants
    const rides = await prisma.ride.findMany({
      where: filters,
      include: {
        driver: {
          select: {
            id: true,
            username: true,
            driverProfile: {
              select: {
                rating: true
              }
            }
          }
        },
        vehicle: true
      },
      orderBy: {
        departureDate: 'asc'
      }
    });
    
    // Filtrer avec des critères plus complexes qui ne peuvent pas être traités par Prisma
    let filteredRides = rides;
    
    if (maxDuration) {
      const maxDurationMinutes = parseInt(maxDuration.toString());
      filteredRides = filteredRides.filter((ride: { departureTime: any; arrivalTime: any; }) => {
        // Calculer la durée du trajet à partir des heures de départ et d'arrivée
        const departureTime = new Date(`2000-01-01 ${ride.departureTime}`);
        const arrivalTime = new Date(`2000-01-01 ${ride.arrivalTime}`);
        
        if (arrivalTime < departureTime) {
          // Si l'arrivée est le jour suivant
          arrivalTime.setDate(arrivalTime.getDate() + 1);
        }
        
        const durationMinutes = (arrivalTime.getTime() - departureTime.getTime()) / 60000;
        return durationMinutes <= maxDurationMinutes;
      });
    }
    
    if (minRating) {
      const minRatingValue = parseFloat(minRating.toString());
      filteredRides = filteredRides.filter((ride: { driver: { driverProfile: { rating: number; }; }; }) => {
        return ride.driver.driverProfile?.rating >= minRatingValue;
      });
    }
    
    // Formater les données pour le frontend
    const formattedRides = filteredRides.map((ride: { id: any; departureCity: any; arrivalCity: any; departureDate: { toISOString: () => string; }; departureTime: any; arrivalTime: any; availableSeats: any; price: any; vehicle: { isElectric: any; }; driver: { id: any; username: any; driverProfile: { rating: any; }; }; }) => ({
      id: ride.id,
      departureCity: ride.departureCity,
      arrivalCity: ride.arrivalCity,
      departureDate: ride.departureDate.toISOString().split('T')[0],
      departureTime: ride.departureTime,
      arrivalTime: ride.arrivalTime,
      availableSeats: ride.availableSeats,
      price: ride.price,
      isEcological: ride.vehicle.isElectric,
      driver: {
        id: ride.driver.id,
        username: ride.driver.username,
        rating: ride.driver.driverProfile?.rating || 0
      }
    }));
    
    res.status(200).json(formattedRides);
  } catch (error) {
    console.error('Erreur lors de la recherche de covoiturages:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche de covoiturages' });
  }
};