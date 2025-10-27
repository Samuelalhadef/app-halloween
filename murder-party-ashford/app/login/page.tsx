'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Effacer l'erreur quand l'utilisateur tape
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue');
        setIsLoading(false);
        return;
      }

      // Connexion réussie, rediriger vers le jeu
      router.push('/game');
      router.refresh();
    } catch (err) {
      setError('Erreur de connexion au serveur');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold text-accent-gold mb-2">
            Connexion
          </h1>
          <p className="text-text-gray font-inter">
            Accédez à l'enquête du Manoir Ashford
          </p>
        </div>

        {/* Card */}
        <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          {error && (
            <div className="mb-6 p-4 bg-accent-crimson/20 border border-accent-crimson rounded-md">
              <p className="text-accent-crimson font-inter text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Identifiant ou Email"
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Entrez votre identifiant ou email"
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted font-inter text-sm italic">
              Les comptes sont gérés par l'administrateur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
