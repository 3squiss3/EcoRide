// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Définition du schéma de validation
const registerSchema = z.object({
  username: z.string()
    .min(3, "Le pseudo doit contenir au moins 3 caractères")
    .max(30, "Le pseudo ne peut pas dépasser 30 caractères"),
  email: z.string()
    .email("Adresse email invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Les mots de passe ne correspondent pas",
  path: ["passwordConfirm"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });
  
  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setServerError('');
    
    try {
      // Simulation d'un appel API
      console.log('Données d\'inscription:', data);
      
      // Attendre 1 seconde pour simuler l'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Rediriger vers la page de connexion avec un message de succès
      navigate('/connexion', { 
        state: { 
          message: 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.' 
        } 
      });
    } catch (error) {
      setServerError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Créer un compte</h1>
        <p className="mt-2 text-gray-600">
          Rejoignez EcoRide et bénéficiez de 20 crédits offerts !
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Pseudo
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              {...register('username')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-eco-green-500'
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-eco-green-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-eco-green-500'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <input
              id="passwordConfirm"
              type="password"
              autoComplete="new-password"
              {...register('passwordConfirm')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.passwordConfirm ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-eco-green-500'
              }`}
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm text-red-600">{errors.passwordConfirm.message}</p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-eco-green-600 hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion" className="text-eco-green-600 hover:text-eco-green-800 font-medium">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;