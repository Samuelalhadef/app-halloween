'use client';

import { useMusic } from '@/contexts/MusicContext';

export default function BackgroundMusic() {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Simple Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="group bg-gradient-to-br from-[#1a2420] to-[#0f1512] border-2 border-accent-gold/40 hover:border-accent-gold/60 rounded-full p-4 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
        title={isPlaying ? 'Arrêter la musique' : 'Lancer la musique'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
