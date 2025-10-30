'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [timerState, setTimerState] = useState({
    isRunning: false,
    timeRemaining: 0,
  });
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user.role !== 'admin') {
            router.push('/game');
          } else {
            setCurrentUser(data.user);
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };
    checkAdmin();
  }, [router]);

  // Récupérer l'état du chrono
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await fetch('/api/game/timer');
        if (response.ok) {
          const data = await response.json();
          setTimerState({
            isRunning: data.isRunning,
            timeRemaining: data.timeRemaining,
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du chrono:', error);
      }
    };

    fetchTimer();
    const interval = setInterval(fetchTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Gérer le chrono
  const handleTimer = async (action: 'start' | 'pause' | 'reset') => {
    try {
      const response = await fetch('/api/game/timer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        setSuccess(`Chronomètre ${action === 'start' ? 'démarré' : action === 'pause' ? 'mis en pause' : 'réinitialisé'}`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error);
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      setError('Erreur lors de la gestion du chronomètre');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Envoyer une notification
  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!notificationMessage.trim()) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: notificationMessage,
          type: notificationType,
        }),
      });

      if (response.ok) {
        setSuccess('Notification envoyée avec succès');
        setNotificationMessage('');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error);
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      setError('Erreur lors de l\'envoi de la notification');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Formater le temps
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <p className="text-text-light font-inter">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0e0d] via-[#1a2420] to-[#0f1512]">
      {/* Background Gothic Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-5xl font-bold text-accent-gold mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            PANNEAU ADMINISTRATEUR
          </h1>
          <p className="font-inter text-text-muted text-sm tracking-widest">
            GESTION DU JEU
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-accent-crimson/20 border border-accent-crimson rounded-md">
            <p className="text-accent-crimson font-inter text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-green-500/20 border border-green-500 rounded-md">
            <p className="text-green-500 font-inter text-sm">{success}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Timer Control */}
          <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4">
              ⏱️ Gestion du Chronomètre
            </h2>
            <div className="bg-primary-bg border border-accent-gold/20 rounded-lg p-6 mb-4 text-center">
              <p className="text-text-muted font-inter text-sm mb-2">Temps restant</p>
              <p className="font-['Orbitron',monospace] text-5xl font-bold text-accent-gold">
                {formatTime(timerState.timeRemaining)}
              </p>
              <p className="text-text-muted font-inter text-xs mt-2">
                {timerState.isRunning ? 'En cours' : 'En pause'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleTimer('start')}
                disabled={timerState.isRunning}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-inter font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ▶️ Démarrer
              </button>
              <button
                onClick={() => handleTimer('pause')}
                disabled={!timerState.isRunning}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-inter font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⏸️ Pause
              </button>
              <button
                onClick={() => handleTimer('reset')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-inter font-semibold transition-colors"
              >
                🔄 Réinitialiser
              </button>
            </div>
          </div>

          {/* Global Notifications */}
          <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4">
              📢 Notifications Globales
            </h2>
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-text-light font-inter text-sm mb-2">
                  Message (max 200 caractères)
                </label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  maxLength={200}
                  rows={3}
                  placeholder="Écrivez votre message..."
                  className="w-full bg-primary-bg border border-accent-gold/30 rounded-lg px-4 py-3 text-text-light font-inter focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/60 transition-colors resize-none"
                />
                <p className="text-text-muted text-xs font-inter mt-1">
                  {notificationMessage.length}/200 caractères
                </p>
              </div>

              <div>
                <label className="block text-text-light font-inter text-sm mb-2">
                  Type de notification
                </label>
                <select
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value as any)}
                  className="w-full bg-primary-bg border border-accent-gold/30 rounded-lg px-4 py-3 text-text-light font-inter focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/60 transition-colors"
                >
                  <option value="info">Info (bleu)</option>
                  <option value="success">Succès (vert)</option>
                  <option value="warning">Avertissement (jaune)</option>
                  <option value="error">Erreur (rouge)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!notificationMessage.trim()}
                className="w-full bg-accent-gold hover:bg-accent-gold/80 text-primary-dark px-6 py-3 rounded-lg font-inter font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Envoyer la notification à tous les joueurs
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4">
              🎮 Navigation
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/clues')}
                className="bg-accent-burgundy hover:bg-accent-crimson text-text-light px-6 py-3 rounded-lg font-inter font-semibold transition-colors"
              >
                💬 Discussion (valider indices)
              </button>
              <button
                onClick={() => router.push('/admin/accusations')}
                className="bg-accent-burgundy hover:bg-accent-crimson text-text-light px-6 py-3 rounded-lg font-inter font-semibold transition-colors"
              >
                ⚖️ Valider accusations finales
              </button>
              <button
                onClick={() => router.push('/score')}
                className="bg-accent-burgundy hover:bg-accent-crimson text-text-light px-6 py-3 rounded-lg font-inter font-semibold transition-colors"
              >
                🏆 Classement
              </button>
              <button
                onClick={() => router.push('/game')}
                className="bg-accent-burgundy hover:bg-accent-crimson text-text-light px-6 py-3 rounded-lg font-inter font-semibold transition-colors"
              >
                🎯 Retour au jeu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
