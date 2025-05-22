"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Début du peuplement de la base de données...');
    // Nettoyer les données existantes
    await prisma.review.deleteMany();
    await prisma.passengerRide.deleteMany();
    await prisma.ride.deleteMany();
    await prisma.driverPreference.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.driverProfile.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Données existantes supprimées');
    // Créer un administrateur
    const adminPassword = await bcrypt_1.default.hash('Admin123!', 10);
    await prisma.user.create({
        data: {
            username: 'admin',
            email: 'admin@ecoride.fr',
            password: adminPassword,
            role: 'ADMIN',
            credits: 1000,
            isDriver: false,
            isPassenger: false
        }
    });
    console.log('👤 Administrateur créé');
    // Créer un employé
    const employeePassword = await bcrypt_1.default.hash('Employee123!', 10);
    await prisma.user.create({
        data: {
            username: 'employe',
            email: 'employe@ecoride.fr',
            password: employeePassword,
            role: 'EMPLOYEE',
            credits: 100,
            isDriver: false,
            isPassenger: false
        }
    });
    console.log('👥 Employé créé');
    // Créer des utilisateurs normaux
    const users = [];
    const usernames = ['martin', 'sophie', 'lucas', 'emma', 'thomas', 'lea', 'antoine', 'camille'];
    for (let i = 0; i < usernames.length; i++) {
        const password = await bcrypt_1.default.hash('User123!', 10);
        const user = await prisma.user.create({
            data: {
                username: usernames[i],
                email: `${usernames[i]}@example.com`,
                password: password,
                role: 'USER',
                credits: Math.floor(Math.random() * 50) + 10, // Entre 10 et 59 crédits
                isDriver: Math.random() > 0.3, // 70% de chance d'être conducteur
                isPassenger: true
            }
        });
        users.push(user);
    }
    console.log('👥 Utilisateurs créés');
    // Créer des profils conducteur et véhicules
    const vehicleData = [
        { brand: 'Renault', model: 'Zoé', energy: 'Électrique', isElectric: true, color: 'Bleu' },
        { brand: 'Tesla', model: 'Model 3', energy: 'Électrique', isElectric: true, color: 'Blanc' },
        { brand: 'Peugeot', model: '308', energy: 'Diesel', isElectric: false, color: 'Gris' },
        { brand: 'Citroën', model: 'C4', energy: 'Essence', isElectric: false, color: 'Rouge' },
        { brand: 'BMW', model: 'i3', energy: 'Électrique', isElectric: true, color: 'Noir' },
        { brand: 'Volkswagen', model: 'Golf', energy: 'Essence', isElectric: false, color: 'Blanc' }
    ];
    let vehicleIndex = 0;
    for (const user of users) {
        if (user.isDriver) {
            // Créer le profil conducteur
            const driverProfile = await prisma.driverProfile.create({
                data: {
                    userId: user.id,
                    rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Note entre 3.0 et 5.0 avec 1 décimale
                    reviewCount: Math.floor(Math.random() * 20) + 1
                }
            });
            // Créer un véhicule
            const vehicleInfo = vehicleData[vehicleIndex % vehicleData.length];
            const vehicle = await prisma.vehicle.create({
                data: {
                    driverProfileId: driverProfile.id,
                    licensePlate: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 900) + 100}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                    brand: vehicleInfo.brand,
                    model: vehicleInfo.model,
                    color: vehicleInfo.color,
                    registrationYear: Math.floor(Math.random() * 10) + 2015, // Entre 2015 et 2024
                    seats: Math.floor(Math.random() * 3) + 4, // Entre 4 et 6 places
                    energy: vehicleInfo.energy,
                    isElectric: vehicleInfo.isElectric
                }
            });
            // Créer les préférences du conducteur
            await prisma.driverPreference.create({
                data: {
                    driverProfileId: driverProfile.id,
                    smoking: Math.random() > 0.8, // 20% acceptent les fumeurs
                    animals: Math.random() > 0.4, // 60% acceptent les animaux
                    music: ['Aucune', 'Modérée', 'Forte'][Math.floor(Math.random() * 3)],
                    conversation: ['Silencieuse', 'Discrète', 'Amicale', 'Animée'][Math.floor(Math.random() * 4)],
                    otherPreferences: 'Pas de nourriture dans la voiture'
                }
            });
            vehicleIndex++;
        }
    }
    console.log('🚗 Profils conducteur et véhicules créés');
    // Créer des covoiturages
    const cities = [
        'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes',
        'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Grenoble'
    ];
    const drivers = users.filter(user => user.isDriver);
    for (let i = 0; i < 15; i++) {
        const driver = drivers[Math.floor(Math.random() * drivers.length)];
        const driverProfile = await prisma.driverProfile.findUnique({
            where: { userId: driver.id },
            include: { vehicles: true }
        });
        if (driverProfile && driverProfile.vehicles.length > 0) {
            const vehicle = driverProfile.vehicles[0];
            const departureCity = cities[Math.floor(Math.random() * cities.length)];
            let arrivalCity = cities[Math.floor(Math.random() * cities.length)];
            while (arrivalCity === departureCity) {
                arrivalCity = cities[Math.floor(Math.random() * cities.length)];
            }
            const departureDate = new Date();
            departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30)); // Dans les 30 prochains jours
            const departureHour = Math.floor(Math.random() * 16) + 6; // Entre 6h et 21h
            const departureMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, ou 45 minutes
            const arrivalHour = departureHour + Math.floor(Math.random() * 4) + 1; // 1 à 4 heures plus tard
            const arrivalMinute = Math.floor(Math.random() * 4) * 15;
            const seats = vehicle.seats - 1; // Le conducteur prend une place
            const availableSeats = Math.floor(Math.random() * seats) + 1;
            await prisma.ride.create({
                data: {
                    driverId: driver.id,
                    vehicleId: vehicle.id,
                    departureCity: departureCity,
                    departureAddress: `123 Rue de ${departureCity}`,
                    arrivalCity: arrivalCity,
                    arrivalAddress: `456 Avenue de ${arrivalCity}`,
                    departureDate: departureDate,
                    departureTime: `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`,
                    arrivalTime: `${Math.min(arrivalHour, 23).toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`,
                    seats: seats,
                    availableSeats: availableSeats,
                    price: Math.floor(Math.random() * 30) + 10, // Entre 10 et 39 euros
                    status: 'PENDING'
                }
            });
        }
    }
    console.log('🚌 Covoiturages créés');
    console.log('✅ Peuplement terminé !');
    console.log('');
    console.log('🔑 Comptes créés :');
    console.log('Admin - Email: admin@ecoride.fr, Mot de passe: Admin123!');
    console.log('Employé - Email: employe@ecoride.fr, Mot de passe: Employee123!');
    console.log('Utilisateurs - Email: [nom]@example.com, Mot de passe: User123!');
    console.log('  (martin, sophie, lucas, emma, thomas, lea, antoine, camille)');
}
main()
    .catch((e) => {
    console.error('❌ Erreur lors du peuplement:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map