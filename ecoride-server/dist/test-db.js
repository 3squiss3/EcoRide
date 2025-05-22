"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/test-db.ts
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = require("@prisma/client");
const stats_models_1 = require("./models/stats.models"); // Corriger l'import (stats.model au lieu de stats.models)
// Charger les variables d'environnement
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
async function testDatabases() {
    try {
        console.log('🔍 Test des connexions aux bases de données...');
        // Test PostgreSQL avec Prisma
        console.log('📊 Test PostgreSQL...');
        const userCount = await prisma.user.count();
        console.log(`✅ PostgreSQL OK - ${userCount} utilisateurs trouvés`);
        // Test MongoDB
        console.log('📈 Test MongoDB...');
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecoride';
        await mongoose_1.default.connect(mongoUri);
        // Créer une statistique de test
        const testStat = new stats_models_1.DailyStats({
            date: new Date(),
            rideCount: 5,
            creditsEarned: 10,
            newUsers: 2,
            activeUsers: userCount,
            completedRides: 3,
            cancelledRides: 1,
            totalRegisteredUsers: userCount
        });
        await testStat.save();
        const statsCount = await stats_models_1.DailyStats.countDocuments();
        console.log(`✅ MongoDB OK - ${statsCount} enregistrements de statistiques trouvés`);
        console.log('🎉 Toutes les bases de données sont connectées et fonctionnelles !');
    }
    catch (error) {
        console.error('❌ Erreur lors du test des bases de données:', error);
    }
    finally {
        await prisma.$disconnect();
        await mongoose_1.default.disconnect();
    }
}
testDatabases();
//# sourceMappingURL=test-db.js.map