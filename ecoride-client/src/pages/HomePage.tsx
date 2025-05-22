import { Link } from 'react-router-dom';
import { useState } from 'react';

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({
    departure: '',
    destination: '',
    date: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Rediriger vers la page de covoiturage avec les paramètres de recherche
    window.location.href = `/covoiturages?departure=${searchParams.departure}&destination=${searchParams.destination}&date=${searchParams.date}`;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-eco-green-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-16 sm:py-24 lg:py-32">
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  Covoiturez de manière écologique
                </h1>
                <p className="text-xl">
                  Réduisez votre empreinte carbone tout en économisant sur vos trajets
                </p>
                <Link
                  to="/covoiturages"
                  className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-eco-green-700 bg-white hover:bg-eco-green-50 md:py-4 md:text-lg md:px-8 transition"
                >
                  Trouver un covoiturage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-eco-green-50 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-eco-green-800 mb-4">Rechercher un covoiturage</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:flex md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label htmlFor="departure" className="block text-sm font-medium text-eco-green-700">
                  Départ
                </label>
                <input
                  type="text"
                  id="departure"
                  name="departure"
                  value={searchParams.departure}
                  onChange={handleChange}
                  placeholder="Ville de départ"
                  className="mt-1 block w-full border border-eco-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-eco-green-500 focus:border-eco-green-500"
                  required
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="destination" className="block text-sm font-medium text-eco-green-700">
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={searchParams.destination}
                  onChange={handleChange}
                  placeholder="Ville d'arrivée"
                  className="mt-1 block w-full border border-eco-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-eco-green-500 focus:border-eco-green-500"
                  required
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="date" className="block text-sm font-medium text-eco-green-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-eco-green-300 rounded-md shadow-sm py-2 px-3 focus:ring-eco-green-500 focus:border-eco-green-500"
                  required
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-eco-green-600 hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Presentation Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-eco-green-800 sm:text-4xl">
            Pourquoi choisir EcoRide ?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Une approche écologique pour vos déplacements quotidiens ou occasionnels.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-eco-green-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-eco-green-900">Économique</h3>
              <p className="mt-2 text-gray-500">
                Partagez les frais de voyage et économisez sur vos déplacements quotidiens ou ponctuels.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-eco-green-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-eco-green-900">Écologique</h3>
              <p className="mt-2 text-gray-500">
                Réduisez votre empreinte carbone en partageant votre trajet avec d'autres personnes.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-eco-green-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-eco-green-900">Social</h3>
              <p className="mt-2 text-gray-500">
                Faites de nouvelles rencontres et rendez vos trajets plus agréables en voyageant accompagné.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;