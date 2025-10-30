'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Ranking {
  rank: number;
  id: string;
  username: string;
  score: number;
  cluesFound: number;
}

export default function ScorePage() {
  const router = useRouter();
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch('/api/score');
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const data = await response.json();
        setRankings(data.rankings);
      } catch (err) {
        console.error('Error fetching rankings:', err);
        setError('Impossible de charger les classements');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0e0d] via-[#1a2420] to-[#0f1512]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Ornamental Corners */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-accent-gold/30 opacity-50"></div>

      <div className="relative z-10 min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl font-bold text-accent-gold mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              CLASSEMENT
            </h1>
            <p className="font-inter text-text-muted text-sm tracking-widest">SCORES DES ENQUÊTEURS</p>
          </div>

          {/* Scores Table */}
          <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-8 shadow-[0_0_40px_rgba(212,175,55,0.2)] backdrop-blur-sm">

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="font-inter text-accent-gold text-lg">Chargement des classements...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="font-inter text-red-400 text-lg">{error}</p>
              </div>
            )}

            {/* Content State */}
            {!loading && !error && (
              <>
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 pb-4 mb-6 border-b border-accent-gold/30">
                  <div className="font-playfair text-accent-gold text-sm font-semibold tracking-wide">RANG</div>
                  <div className="font-playfair text-accent-gold text-sm font-semibold tracking-wide col-span-2">ENQUÊTEUR</div>
                  <div className="font-playfair text-accent-gold text-sm font-semibold tracking-wide text-center">INDICES</div>
                  <div className="font-playfair text-accent-gold text-sm font-semibold tracking-wide text-right">POINTS</div>
                </div>

                {/* Table Rows */}
                {rankings.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="font-inter text-text-muted text-lg">Aucun joueur n&apos;a encore de score</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rankings.map((ranking) => (
                      <div
                        key={ranking.id}
                        className={`grid grid-cols-5 gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-accent-gold/10 ${
                          ranking.rank === 1 ? 'bg-accent-gold/20 border border-accent-gold/40' : 'border border-accent-gold/20'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={`font-playfair text-2xl font-bold ${
                            ranking.rank === 1 ? 'text-[#FFD700]' :
                            ranking.rank === 2 ? 'text-[#C0C0C0]' :
                            ranking.rank === 3 ? 'text-[#CD7F32]' :
                            'text-text-muted'
                          }`}>
                            {ranking.rank === 1 ? '🥇' : ranking.rank === 2 ? '🥈' : ranking.rank === 3 ? '🥉' : `#${ranking.rank}`}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className="font-inter text-text-light font-medium">{ranking.username}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="font-inter text-accent-gold font-semibold">{ranking.cluesFound}</span>
                        </div>
                        <div className="flex items-center justify-end">
                          <span className="font-playfair text-2xl font-bold text-accent-gold">{ranking.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-accent-gold/30">
              <h3 className="font-playfair text-lg font-bold text-accent-gold mb-4 text-center">
                Système de Points
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-inter text-xs text-text-muted mb-1">Indice validé</p>
                  <p className="font-playfair text-accent-gold text-lg font-bold">+5</p>
                </div>
                <div>
                  <p className="font-inter text-xs text-text-muted mb-1">Meurtrier correct</p>
                  <p className="font-playfair text-accent-gold text-lg font-bold">+100</p>
                </div>
                <div>
                  <p className="font-inter text-xs text-text-muted mb-1">Complice correct</p>
                  <p className="font-playfair text-accent-gold text-lg font-bold">+30</p>
                </div>
                <div>
                  <p className="font-inter text-xs text-text-muted mb-1">Mobile correct</p>
                  <p className="font-playfair text-accent-gold text-lg font-bold">+65</p>
                </div>
                <div>
                  <p className="font-inter text-xs text-text-muted mb-1">Cause de mort</p>
                  <p className="font-playfair text-accent-gold text-lg font-bold">+50</p>
                </div>
                <div>
                  <p className="font-inter text-xs text-text-muted mb-1">Arme/méthode</p>
                  <p className="font-playfair text-accent-gold text-lg font-bold">+30</p>
                </div>
              </div>
              <p className="font-inter text-xs text-text-muted text-center mt-4">
                Maximum possible : 275 points pour l&apos;accusation finale + points d&apos;indices
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/game')}
              className="font-inter text-text-muted text-sm hover:text-accent-gold transition-colors flex items-center gap-2 mx-auto"
            >
              <span>←</span>
              Retour au jeu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
