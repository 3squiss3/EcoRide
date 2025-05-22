import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';

// Charger les variables d'environnement
dotenv.config();

const prisma = new PrismaClient();

// Modèle MongoDB simple pour les statistiques
const DailyStatsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  rideCount: { type: Number, default: 0 },
  creditsEarned: { type: Number, default: 0 },
  newUsers: { type: Number, default: 0 },
  activeUsers: { type: Number, default: 0 },
  completedRides: { type: Number, default: 0 },
  cancelledRides: { type: Number, default: 0 },
  totalRegisteredUsers: { type: Number, default: 0 }
});

const DailyStats = mongoose.model('DailyStats', DailyStatsSchema);

async function testBothDatabases() {
  try {
    console.log('🔍 Test des deux bases de données...\n');

    // ==================== TEST POSTGRESQL ====================
    console.log('📊 Test PostgreSQL (Prisma)...');
    await prisma.$connect();
    
    const userCount = await prisma.user.count();
    console.log(`✅ PostgreSQL OK - ${userCount} utilisateur(s) trouvé(s)`);

    // Créer un deuxième utilisateur pour le test
    const driver = await prisma.user.upsert({
      where: { email: 'driver@test.fr' },
      update: { updatedAt: new Date() },
      create: {
        username: 'driver_test',
        email: 'driver@test.fr',
        password: 'hashedpassword456',
        credits: 30,
        isDriver: true,
        isPassenger: true
      }
    });
    console.log(`✅ Conducteur créé/mis à jour: ${driver.username}`);

    const finalUserCount = await prisma.user.count();
    console.log(`📈 Total utilisateurs PostgreSQL: ${finalUserCount}\n`);

    // ==================== TEST MONGODB ====================
    console.log('📈 Test MongoDB (Mongoose)...');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/ecoride?authSource=admin';
    await mongoose.connect(mongoUri);
    console.log('✅ Connexion MongoDB établie');

    // Créer une statistique quotidienne
    const todayStats = new DailyStats({
      date: new Date(),
      rideCount: 3,
      creditsEarned: 15,
      newUsers: finalUserCount,
      activeUsers: finalUserCount,
      completedRides: 2,
      cancelledRides: 1,
      totalRegisteredUsers: finalUserCount
    });

    await todayStats.save();
    console.log('✅ Statistique quotidienne créée');

    const statsCount = await DailyStats.countDocuments();
    console.log(`📊 Total documents MongoDB: ${statsCount}`);

    // Récupérer les dernières statistiques
    const latestStats = await DailyStats.findOne().sort({ date: -1 });
    if (latestStats) {
      console.log(`📅 Dernière stat: ${latestStats.date.toLocaleDateString()} - ${latestStats.rideCount} trajets`);
    }

    // ==================== RÉSUMÉ ====================
    console.log('\n🎉 Tests réussis !');
    console.log('=' .repeat(50));
    console.log(`📊 PostgreSQL: ${finalUserCount} utilisateurs`);
    console.log(`📈 MongoDB: ${statsCount} documents statistiques`);
    console.log('=' .repeat(50));

    console.log('\n✅ Les deux bases de données sont opérationnelles !');
    console.log('🚀 Vous pouvez maintenant développer votre application EcoRide');

  } catch (error) {
    console.error('❌ Erreur lors du test des bases de données:', error);
    
    // Diagnostic d'erreur
    if (error.message?.includes('ECONNREFUSED')) {
      console.log('💡 Vérifiez que Docker est démarré: docker-compose up -d');
    } else if (error.message?.includes('authentication')) {
      console.log('💡 Vérifiez vos identifiants de base de données dans .env');
    }

  } finally {
    try {
      await prisma.$disconnect();
      await mongoose.disconnect();
      console.log('\n🔌 Connexions fermées proprement');
    } catch (error) {
      console.log('⚠️ Erreur lors de la fermeture des connexions');
    }
  }
}

testBothDatabases();