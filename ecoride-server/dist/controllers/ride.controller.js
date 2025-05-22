"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRides = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Rechercher des covoiturages
const searchRides = async (req, res) => {
    try {
        const { departureCity, arrivalCity, departureDate, isEcological, maxPrice, maxDuration, minRating } = req.query;
        // Construire les filtres
        const filters = {
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
            filteredRides = filteredRides.filter((ride) => {
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
            filteredRides = filteredRides.filter((ride) => {
                var _a;
                return ((_a = ride.driver.driverProfile) === null || _a === void 0 ? void 0 : _a.rating) >= minRatingValue;
            });
        }
        // Formater les données pour le frontend
        const formattedRides = filteredRides.map((ride) => {
            var _a;
            return ({
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
                    rating: ((_a = ride.driver.driverProfile) === null || _a === void 0 ? void 0 : _a.rating) || 0
                }
            });
        });
        res.status(200).json(formattedRides);
    }
    catch (error) {
        console.error('Erreur lors de la recherche de covoiturages:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la recherche de covoiturages' });
    }
};
exports.searchRides = searchRides;
//# sourceMappingURL=ride.controller.js.map