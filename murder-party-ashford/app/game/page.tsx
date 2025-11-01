'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlobalNotifications from '@/components/GlobalNotifications';

export default function GamePage() {
  const router = useRouter();
  const [time, setTime] = useState(75 * 60); // 75 minutes en secondes
  const [isRunning, setIsRunning] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Récupérer l'utilisateur actuel
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      }
    };
    fetchUser();
  }, []);

  // Synchroniser avec l'état global du chronomètre
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await fetch('/api/game/timer');
        if (response.ok) {
          const data = await response.json();
          setTime(data.timeRemaining);
          setIsRunning(data.isRunning);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du chronomètre:', error);
      }
    };

    fetchTimer();
    const interval = setInterval(fetchTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <GlobalNotifications />
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0e0d] via-[#1a2420] to-[#0f1512]">
        {/* Background Gothic Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Ornamental Corner Decorations */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 border-l-2 border-b-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-accent-gold/30 opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">

        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-5xl font-bold text-accent-gold mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            MURDER PARTY
          </h1>
          <p className="font-inter text-text-muted text-sm tracking-widest">MANOIR ASHFORD • 1925</p>
        </div>

        {/* Timer Circle */}
        <div className="mb-16 relative">
          {/* Outer decorative ring */}
          <div className="absolute inset-0 -m-8 rounded-full border-2 border-accent-gold/20 animate-pulse"></div>

          {/* Main timer container */}
          <div className="relative w-80 h-80 rounded-full border-4 border-accent-gold/40 bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 backdrop-blur-sm shadow-[0_0_60px_rgba(212,175,55,0.3),inset_0_0_60px_rgba(0,0,0,0.5)] flex items-center justify-center">
            {/* Inner decorative ring */}
            <div className="absolute inset-0 m-4 rounded-full border border-accent-gold/30"></div>

            {/* Ornamental corners inside circle */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-accent-gold/40"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-accent-gold/40"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-accent-gold/40"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-accent-gold/40"></div>

            {/* Timer Display */}
            <div className="relative z-10 text-center">
              <div
                className="font-['Orbitron',monospace] text-7xl font-bold tracking-wider"
                style={{
                  color: time < 600 ? '#dc2626' : '#d4af37',
                  textShadow: time < 600
                    ? '0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.4)'
                    : '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)'
                }}
              >
                {formatTime(time)}
              </div>
              <p className="font-inter text-xs text-text-muted mt-2 tracking-widest">TEMPS RESTANT</p>
            </div>
          </div>

          {/* Decorative glow effect */}
          <div className="absolute inset-0 -m-4 rounded-full bg-accent-gold/5 blur-2xl"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">

          {/* Button: Score */}
          <button
            onClick={() => router.push('/score')}
            className="group relative h-24 rounded-full border-2 border-accent-gold/40 bg-gradient-to-br from-[#1a2420]/90 to-[#0f1512]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:border-accent-gold/60 transition-all duration-300"
          >
            <div className="absolute inset-0 m-2 rounded-full border border-accent-gold/20"></div>
            <div className="relative flex flex-col items-center justify-center h-full">
              <span className="text-3xl mb-1">🏆</span>
              <span className="font-playfair text-accent-gold text-lg font-semibold tracking-wide group-hover:scale-110 transition-transform">
                SCORE
              </span>
            </div>
          </button>

          {/* Button: Indices */}
          <button
            onClick={() => router.push('/clues')}
            className="group relative h-24 rounded-full border-2 border-accent-gold/40 bg-gradient-to-br from-[#1a2420]/90 to-[#0f1512]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:border-accent-gold/60 transition-all duration-300"
          >
            <div className="absolute inset-0 m-2 rounded-full border border-accent-gold/20"></div>
            <div className="relative flex flex-col items-center justify-center h-full">
              <span className="text-3xl mb-1">🔍</span>
              <span className="font-playfair text-accent-gold text-lg font-semibold tracking-wide group-hover:scale-110 transition-transform">
                INDICES
              </span>
            </div>
          </button>

          {/* Button: Recherche */}
          <button
            onClick={() => router.push('/search')}
            className="group relative h-24 rounded-full border-2 border-accent-gold/40 bg-gradient-to-br from-[#1a2420]/90 to-[#0f1512]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:border-accent-gold/60 transition-all duration-300"
          >
            <div className="absolute inset-0 m-2 rounded-full border border-accent-gold/20"></div>
            <div className="relative flex flex-col items-center justify-center h-full">
              <span className="text-3xl mb-1">🕵️</span>
              <span className="font-playfair text-accent-gold text-lg font-semibold tracking-wide group-hover:scale-110 transition-transform">
                RECHERCHE
              </span>
            </div>
          </button>

          {/* Button: Résultat Final */}
          <button
            onClick={() => router.push('/accusation')}
            className="group relative h-24 rounded-full border-2 border-accent-crimson/60 bg-gradient-to-br from-accent-crimson/20 to-accent-burgundy/20 backdrop-blur-sm shadow-[0_0_20px_rgba(153,27,27,0.3)] hover:shadow-[0_0_40px_rgba(153,27,27,0.5)] hover:border-accent-crimson/80 transition-all duration-300"
          >
            <div className="absolute inset-0 m-2 rounded-full border border-accent-crimson/30"></div>
            <div className="relative flex flex-col items-center justify-center h-full">
              <span className="text-3xl mb-1">⚖️</span>
              <span className="font-playfair text-text-light text-lg font-semibold tracking-wide group-hover:scale-110 transition-transform">
                RÉSULTAT
              </span>
            </div>
          </button>
        </div>

        {/* Admin Button */}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => router.push('/admin')}
            className="mt-12 bg-accent-crimson hover:bg-accent-crimson/80 text-white px-8 py-3 rounded-full font-inter font-semibold transition-colors shadow-[0_0_20px_rgba(153,27,27,0.3)]"
          >
            ⚙️ Panneau Administrateur
          </button>
        )}

      </div>
    </div>
    </>
  );
}
