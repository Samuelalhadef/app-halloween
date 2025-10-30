'use client';

import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Créer l'élément audio
    audioRef.current = new Audio('/sherlock-theme.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Nettoyer lors du démontage
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.error('Erreur lors de la lecture de la musique:', err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Volume Slider (visible quand la musique joue) */}
      {isPlaying && (
        <div className="bg-gradient-to-br from-[#1a2420]/95 to-[#0f1512]/95 border-2 border-accent-gold/40 rounded-lg px-4 py-3 shadow-[0_0_20px_rgba(212,175,55,0.3)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-text-muted text-xs font-inter">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="w-24 h-1 bg-accent-gold/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-gold [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <span className="text-text-muted text-xs font-inter w-8">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="group bg-gradient-to-br from-[#1a2420] to-[#0f1512] border-2 border-accent-gold/40 hover:border-accent-gold/60 rounded-full p-4 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
        title={isPlaying ? 'Couper la musique' : 'Jouer la musique'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>

      {/* Now Playing Indicator */}
      {isPlaying && (
        <div className="bg-gradient-to-br from-[#1a2420]/95 to-[#0f1512]/95 border-2 border-accent-gold/40 rounded-lg px-4 py-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-accent-gold rounded-full animate-pulse"></div>
              <div className="w-1 h-3 bg-accent-gold rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-3 bg-accent-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-text-light text-xs font-inter">Sherlock Theme</span>
          </div>
        </div>
      )}
    </div>
  );
}
