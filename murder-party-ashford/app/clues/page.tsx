'use client';

import { useRouter } from 'next/navigation';
import Chat from '@/components/Chat';
import GlobalNotifications from '@/components/GlobalNotifications';

export default function CluesPage() {
  const router = useRouter();

  return (
    <>
      <GlobalNotifications />
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

      {/* Ornamental Corner Decorations */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 border-l-2 border-b-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-accent-gold/30 opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-5xl font-bold text-accent-gold mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            INDICES
          </h1>
          <p className="font-inter text-text-muted text-sm tracking-widest">
            PARTAGEZ VOS DÉCOUVERTES
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 max-w-5xl w-full mx-auto mb-8" style={{ minHeight: '600px' }}>
          <Chat />
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/game')}
            className="font-inter text-text-muted text-sm hover:text-accent-gold transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            Retour au jeu
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
