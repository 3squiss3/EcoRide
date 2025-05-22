// src/pages/ContactPage.tsx
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      setSuccess('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contactez-nous</h1>
        <p className="mt-4 text-lg text-gray-500">
          Une question, une suggestion ou un problème ? N'hésitez pas à nous contacter.
        </p>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="label">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="input"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-12 bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de contact</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
              <p className="mt-1 text-gray-500">
                123 Avenue de l'Écologie<br />
                75001 Paris<br />
                France
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Contact</h3>
              <p className="mt-1 text-gray-500">
                Email : contact@ecoride.fr<br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;