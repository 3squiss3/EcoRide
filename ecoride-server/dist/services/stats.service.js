"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const stats_models_1 = require("../models/stats.models");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class StatsService {
    // Enregistrer une activité
    static async logActivity(userId, action, details = {}) {
        try {
            const log = new stats_models_1.ActivityLog({
                userId,
                action,
                details,
                timestamp: new Date()
            });
            await log.save();
            // Mettre à jour les statistiques du jour
            await this.updateDailyStats();
        }
        catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'activité:', error);
        }
    }
    // Mettre à jour les statistiques quotidiennes
    static async updateDailyStats() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Récupérer les statistiques du jour depuis PostgreSQL
            const totalUsers = await prisma.user.count();
            const newUsersToday = await prisma.user.count({
                where: {
                    createdAt: {
                        gte: today,
                        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            });
            const ridesCreatedToday = await prisma.ride.count({
                where: {
                    createdAt: {
                        gte: today,
                        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            });
            const completedRidesToday = await prisma.ride.count({
                where: {
                    status: 'COMPLETED',
                    updatedAt: {
                        gte: today,
                        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            });
            const cancelledRidesToday = await prisma.ride.count({
                where: {
                    status: 'CANCELLED',
                    updatedAt: {
                        gte: today,
                        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            });
            // Calculer les crédits gagnés aujourd'hui (2 crédits par ride complétée)
            const creditsEarnedToday = completedRidesToday * 2;
            // Mettre à jour ou créer l'enregistrement des statistiques du jour
            await stats_models_1.DailyStats.findOneAndUpdate({ date: today }, {
                rideCount: ridesCreatedToday,
                creditsEarned: creditsEarnedToday,
                newUsers: newUsersToday,
                activeUsers: totalUsers, // Simplification - dans un vrai projet, tu calculerais les utilisateurs actifs
                completedRides: completedRidesToday,
                cancelledRides: cancelledRidesToday,
                totalRegisteredUsers: totalUsers
            }, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            });
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour des statistiques:', error);
        }
    }
    // Récupérer les statistiques pour les 7 derniers jours
    static async getWeeklyStats() {
        try {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const stats = await stats_models_1.DailyStats.find({
                date: { $gte: weekAgo }
            }).sort({ date: 1 });
            return stats;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
            return [];
        }
    }
    // Récupérer les statistiques totales
    static async getTotalStats() {
        try {
            const pipeline = [
                {
                    $group: {
                        _id: null,
                        totalRides: { $sum: '$rideCount' },
                        totalCreditsEarned: { $sum: '$creditsEarned' },
                        totalCompletedRides: { $sum: '$completedRides' },
                        totalCancelledRides: { $sum: '$cancelledRides' }
                    }
                }
            ];
            const result = await stats_models_1.DailyStats.aggregate(pipeline);
            if (result.length > 0) {
                return result[0];
            }
            return {
                totalRides: 0,
                totalCreditsEarned: 0,
                totalCompletedRides: 0,
                totalCancelledRides: 0
            };
        }
        catch (error) {
            console.error('Erreur lors de la récupération des statistiques totales:', error);
            return null;
        }
    }
}
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map