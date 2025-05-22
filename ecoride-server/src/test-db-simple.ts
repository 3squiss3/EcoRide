import dotenv from 'dotenv';

// Charger les variables d'environnement en premier
dotenv.config();

// Importer Prisma depuis le chemin standard
import { PrismaClient } from '@prisma/client';

console.log('🔍 Variables d\'environnement chargées');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Définie ✅' : 'Non définie ❌');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Logs pour debug
});

async function testPostgreSQL() {
  try {
    console.log('🔍 Test de connexion PostgreSQL...');
   
    // Test de connexion basique
    console.log('📡 Test de connexion à la base...');
    await prisma.$connect();
    console.log('✅ Connexion établie');
   
    // Test simple de requête
    console.log('📊 Comptage des utilisateurs...');
    const userCount = await prisma.user.count();
    console.log(`✅ PostgreSQL OK - ${userCount} utilisateurs trouvés`);

    // Test de création d'un utilisateur de test
    console.log('👤 Test de création d\'utilisateur...');
    const testUser = await prisma.user.upsert({
      where: { email: 'test@ecoride.fr' },
      update: {},
      create: {
        username: 'testuser',
        email: 'test@ecoride.fr',
        password: 'hashedpassword123',
        credits: 20
      }
    });
    console.log('✅ Utilisateur test créé/trouvé:', testUser.username);
   
    console.log('🎉 PostgreSQL fonctionne parfaitement !');
   
  } catch (error) {
    console.error('❌ Erreur PostgreSQL:');
    console.error(error);
   
    // Informations de debug supplémentaires
    console.log('\n🔍 Informations de debug:');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');
   
  } finally {
    console.log('🔌 Fermeture de la connexion...');
    await prisma.$disconnect();
  }
}

testPostgreSQL();