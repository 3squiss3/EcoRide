// src/test-db.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';
import { DailyStats } from './models/stats.models'; // Corriger l'import (stats.model au lieu de stats.models)

// Charger les variables d'environnement
dotenv.config();

const prisma = new PrismaClient();

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
    await mongoose.connect(mongoUri);
    
    // Créer une statistique de test
    const testStat = new DailyStats({
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
    
    const statsCount = await DailyStats.countDocuments();
    console.log(`✅ MongoDB OK - ${statsCount} enregistrements de statistiques trouvés`);
    
    console.log('🎉 Toutes les bases de données sont connectées et fonctionnelles !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test des bases de données:', error);
  } finally {
    await prisma.$disconnect();
    await mongoose.disconnect();
  }
}

testDatabases();