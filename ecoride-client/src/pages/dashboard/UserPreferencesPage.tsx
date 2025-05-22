import { useState } from 'react';

const UserPreferencesPage = () => {
  const [preferences, setPreferences] = useState({
    smoking: false,
    animals: true,
    music: 'Modérée',
    conversation: 'Amicale',
    otherPreferences: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      setSuccess('Vos préférences ont été enregistrées avec succès !');
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Mes préférences</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Préférences générales</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="smoking"
                  name="smoking"
                  type="checkbox"
                  checked={preferences.smoking}
                  onChange={handleChange}
                  className="h-4 w-4 text-eco-green-600 focus:ring-eco-green-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="smoking" className="font-medium text-gray-700">Fumeur accepté</label>
                <p className="text-gray-500">Autorisez-vous les passagers à fumer pendant le trajet ?</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="animals"
                  name="animals"
                  type="checkbox"
                  checked={preferences.animals}
                  onChange={handleChange}
                  className="h-4 w-4 text-eco-green-600 focus:ring-eco-green-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="animals" className="font-medium text-gray-700">Animaux acceptés</label>
                <p className="text-gray-500">Acceptez-vous que les passagers voyagent avec des animaux ?</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Ambiance du trajet</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="music" className="label">Musique</label>
              <select
                id="music"
                name="music"
                value={preferences.music}
                onChange={handleChange}
                className="input"
              >
                <option value="Aucune">Aucune</option>
                <option value="Modérée">Modérée</option>
                <option value="Forte">Forte</option>
                <option value="Au choix des passagers">Au choix des passagers</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="conversation" className="label">Conversation</label>
              <select
                id="conversation"
                name="conversation"
                value={preferences.conversation}
                onChange={handleChange}
                className="input"
              >
                <option value="Silencieuse">Silencieuse</option>
                <option value="Discrète">Discrète</option>
                <option value="Amicale">Amicale</option>
                <option value="Animée">Animée</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-lg text-gray-900 mb-4">Autres préférences</h3>
          
          <div>
            <label htmlFor="otherPreferences" className="label">Spécifiez vos autres préférences</label>
            <textarea
              id="otherPreferences"
              name="otherPreferences"
              value={preferences.otherPreferences}
              onChange={handleChange}
              className="input h-32"
              placeholder="Ex: Pas de nourriture dans la voiture, préférence pour les petits bagages, etc."
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Enregistrer les préférences'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPreferencesPage;