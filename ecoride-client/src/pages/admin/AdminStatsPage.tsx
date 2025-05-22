import { useState, useEffect } from 'react';
import type { RideStat } from '../../types';

// Données fictives pour simulation
const mockRidesStats: RideStat[] = [
  { date: '2023-06-01', count: 24, credits: 48 },
  { date: '2023-06-02', count: 36, credits: 72 },
  { date: '2023-06-03', count: 42, credits: 84 },
  { date: '2023-06-04', count: 29, credits: 58 },
  { date: '2023-06-05', count: 31, credits: 62 },
  { date: '2023-06-06', count: 38, credits: 76 },
  { date: '2023-06-07', count: 45, credits: 90 }
];

const AdminStatsPage = () => {
  const ridesStats: RideStat[] = mockRidesStats;
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalRides, setTotalRides] = useState<number>(0);
  
  useEffect(() => {
    // Calculer les totaux
    const credits = ridesStats.reduce((sum, stat) => sum + stat.credits, 0);
    const rides = ridesStats.reduce((sum, stat) => sum + stat.count, 0);
    
    setTotalCredits(credits);
    setTotalRides(rides);
  }, [ridesStats]);
  
  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Trouver les valeurs maximales pour les graphiques
  const maxRideCount = Math.max(...ridesStats.map(stat => stat.count));
  const maxCredits = Math.max(...ridesStats.map(stat => stat.credits));
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistiques de la plateforme</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Résumé</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total covoiturages</p>
              <p className="text-2xl font-bold text-gray-900">{totalRides}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total crédits gagnés</p>
              <p className="text-2xl font-bold text-eco-green-600">{totalCredits}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Covoiturages aujourd'hui</p>
              <p className="text-2xl font-bold text-gray-900">{ridesStats[ridesStats.length - 1]?.count || 0}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Crédits aujourd'hui</p>
              <p className="text-2xl font-bold text-eco-green-600">{ridesStats[ridesStats.length - 1]?.credits || 0}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Nombre de covoiturages par jour</h3>
          
          <div className="h-64">
            <div className="h-full flex items-end space-x-2">
              {ridesStats.map((stat, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-eco-green-500 rounded-t-sm" 
                    style={{ height: `${(stat.count / maxRideCount) * 100}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(stat.date)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Crédits gagnés par jour</h3>
          
          <div className="h-64">
            <div className="h-full flex items-end space-x-2">
              {ridesStats.map((stat, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-eco-green-600 rounded-t-sm" 
                    style={{ height: `${(stat.credits / maxCredits) * 100}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(stat.date)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsPage;