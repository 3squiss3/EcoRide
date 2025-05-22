import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AxiosError } from 'axios';

const UserProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    isDriver: user?.isDriver || false,
    isPassenger: user?.isPassenger || true
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simuler une requête API
      setTimeout(() => {
        setSuccess('Votre profil a été mis à jour avec succès !');
        setLoading(false);
      }, 1000);
      
      // Dans un cas réel, on ferait :
      // await axios.put(`${API_URL}/users/profile`, profileData, {
      //   headers: { Authorization: `Bearer ${getToken()}` }
      // });
    } catch (err) {
        const error = err as AxiosError<{message: string}>;
        setError(error.response?.data?.message || 'Une erreur est survenue');
        setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Mon profil</h2>
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="username" className="label">Pseudo</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="label">Adresse email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Type d'utilisateur</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isPassenger"
                  name="isPassenger"
                  type="checkbox"
                  checked={profileData.isPassenger}
                  onChange={handleChange}
                  className="h-4 w-4 text-eco-green-600 focus:ring-eco-green-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isPassenger" className="font-medium text-gray-700">Passager</label>
                <p className="text-gray-500">Je souhaite participer à des covoiturages en tant que passager</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isDriver"
                  name="isDriver"
                  type="checkbox"
                  checked={profileData.isDriver}
                  onChange={handleChange}
                  className="h-4 w-4 text-eco-green-600 focus:ring-eco-green-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isDriver" className="font-medium text-gray-700">Conducteur</label>
                <p className="text-gray-500">Je souhaite proposer des covoiturages en tant que conducteur</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfilePage;