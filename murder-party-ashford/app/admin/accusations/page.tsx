'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GlobalNotifications from '@/components/GlobalNotifications';

interface Accusation {
  userId: string;
  username: string;
  score: number;
  cluesFound: number;
  accusation: {
    murderer: string;
    accomplices: string[];
    motive: string;
    causeOfDeath: string;
    weapon: string;
    reasoning: string;
    submittedAt: string;
    isValidated: boolean;
    pointsAwarded: number;
  };
}

export default function AdminAccusationsPage() {
  const router = useRouter();
  const [accusations, setAccusations] = useState<Accusation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [validating, setValidating] = useState<string | null>(null);

  const suspects = [
    { id: 'margaret', name: 'Margaret Walsh', emoji: '👩‍🍳' },
    { id: 'albert', name: 'Albert Whitmore', emoji: '🤵' },
    { id: 'thomas', name: 'Thomas Ashford', emoji: '👨‍💼' },
    { id: 'catherine', name: 'Catherine Ashford', emoji: '👩' },
    { id: 'sebastian', name: 'Sebastian Ashford', emoji: '🎩' },
    { id: 'helena', name: 'Helena Ashford', emoji: '👩‍🦰' },
    { id: 'reginald', name: 'Lord Reginald', emoji: '🧐' },
    { id: 'silas', name: 'Silas Thorne', emoji: '⚗️' },
  ];

  const motives: Record<string, string> = {
    heritage: 'Héritage 💰',
    vengeance: 'Vengeance ⚔️',
    jalousie: 'Jalousie 💔',
    secret: 'Secret familial 🔒',
    argent: 'Dette d\'argent 💸',
    pouvoir: 'Pouvoir 👑',
  };

  const causesOfDeath: Record<string, string> = {
    poison: 'Empoisonnement ☠️',
    coup: 'Coup violent 🔨',
    etouffement: 'Étouffement 😶',
    chute: 'Chute mortelle ⬇️',
    accident: 'Accident ⚠️',
  };

  const weapons: Record<string, string> = {
    arsenic: 'Arsenic ⚗️',
    corde: 'Corde 🪢',
    couteau: 'Couteau 🔪',
    chandelier: 'Chandelier 🕯️',
    oreiller: 'Oreiller 🛏️',
    revolver: 'Revolver 🔫',
    graisse: 'Graisse sur l\'escalier 🧴',
  };

  useEffect(() => {
    fetchAccusations();
  }, []);

  const fetchAccusations = async () => {
    try {
      const response = await fetch('/api/accusations/validate');
      if (response.ok) {
        const data = await response.json();
        setAccusations(data.accusations);
      } else {
        setError('Erreur lors du chargement des accusations');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const validateAccusation = async (userId: string) => {
    setValidating(userId);
    setError('');

    try {
      const response = await fetch('/api/accusations/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Rafraîchir la liste
        await fetchAccusations();
        alert(`Accusation validée ! Points attribués : ${data.points.total}`);
      } else {
        setError(data.error || 'Erreur lors de la validation');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setValidating(null);
    }
  };

  const getSuspectName = (id: string) => {
    return suspects.find(s => s.id === id)?.name || id;
  };

  const getSuspectEmoji = (id: string) => {
    return suspects.find(s => s.id === id)?.emoji || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0e0d] via-[#1a2420] to-[#0f1512]">
        <p className="font-inter text-accent-gold text-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <GlobalNotifications />
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0e0d] via-[#1a2420] to-[#0f1512]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10 min-h-screen px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-playfair text-5xl font-bold text-accent-gold mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                VALIDATION DES ACCUSATIONS
              </h1>
              <p className="font-inter text-text-muted text-sm tracking-widest">PANEL ADMINISTRATEUR</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
                <p className="font-inter text-red-400">{error}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-6 text-center">
                <p className="font-inter text-text-muted text-sm mb-2">Total Accusations</p>
                <p className="font-playfair text-4xl font-bold text-accent-gold">{accusations.length}</p>
              </div>
              <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-green-500/40 rounded-lg p-6 text-center">
                <p className="font-inter text-text-muted text-sm mb-2">Validées</p>
                <p className="font-playfair text-4xl font-bold text-green-400">
                  {accusations.filter(a => a.accusation.isValidated).length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-orange-500/40 rounded-lg p-6 text-center">
                <p className="font-inter text-text-muted text-sm mb-2">En attente</p>
                <p className="font-playfair text-4xl font-bold text-orange-400">
                  {accusations.filter(a => !a.accusation.isValidated).length}
                </p>
              </div>
            </div>

            {/* Accusations List */}
            {accusations.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg">
                <p className="font-inter text-text-muted text-lg">Aucune accusation soumise pour le moment</p>
              </div>
            ) : (
              <div className="space-y-6">
                {accusations.map((acc) => (
                  <div
                    key={acc.userId}
                    className={`bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 rounded-lg p-6 ${
                      acc.accusation.isValidated
                        ? 'border-green-500/40'
                        : 'border-accent-gold/40'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-playfair text-2xl font-bold text-accent-gold mb-1">
                          {acc.username}
                        </h3>
                        <div className="flex gap-4 text-sm text-text-muted font-inter">
                          <span>Score actuel : {acc.score} pts</span>
                          <span>Indices : {acc.cluesFound}</span>
                          <span>Soumis le {new Date(acc.accusation.submittedAt).toLocaleString('fr-FR')}</span>
                        </div>
                      </div>
                      {acc.accusation.isValidated ? (
                        <span className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg font-inter text-sm">
                          ✓ Validé (+{acc.accusation.pointsAwarded} pts)
                        </span>
                      ) : (
                        <button
                          onClick={() => validateAccusation(acc.userId)}
                          disabled={validating === acc.userId}
                          className="bg-accent-gold hover:bg-accent-gold/80 text-primary-bg px-6 py-2 rounded-lg font-inter font-semibold transition-colors disabled:opacity-50"
                        >
                          {validating === acc.userId ? 'Validation...' : 'Valider'}
                        </button>
                      )}
                    </div>

                    {/* Accusation Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        {/* Meurtrier */}
                        <div className="bg-accent-crimson/10 border border-accent-crimson/30 rounded-lg p-4">
                          <p className="font-inter text-xs text-text-muted mb-2">MEURTRIER (+100 pts)</p>
                          <p className="font-playfair text-lg text-text-light">
                            {getSuspectEmoji(acc.accusation.murderer)} {getSuspectName(acc.accusation.murderer)}
                          </p>
                        </div>

                        {/* Complices */}
                        <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4">
                          <p className="font-inter text-xs text-text-muted mb-2">COMPLICES (+30 pts chacun)</p>
                          {acc.accusation.accomplices.length === 0 ? (
                            <p className="font-inter text-sm text-text-muted">Aucun complice</p>
                          ) : (
                            <div className="space-y-1">
                              {acc.accusation.accomplices.map(accId => (
                                <p key={accId} className="font-playfair text-base text-text-light">
                                  {getSuspectEmoji(accId)} {getSuspectName(accId)}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Mobile */}
                        <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4">
                          <p className="font-inter text-xs text-text-muted mb-2">MOBILE (+65 pts)</p>
                          <p className="font-playfair text-base text-text-light">
                            {motives[acc.accusation.motive] || acc.accusation.motive}
                          </p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        {/* Cause de mort */}
                        <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4">
                          <p className="font-inter text-xs text-text-muted mb-2">CAUSE DE MORT (+50 pts)</p>
                          <p className="font-playfair text-base text-text-light">
                            {causesOfDeath[acc.accusation.causeOfDeath] || acc.accusation.causeOfDeath}
                          </p>
                        </div>

                        {/* Arme */}
                        <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4">
                          <p className="font-inter text-xs text-text-muted mb-2">ARME/MÉTHODE (+30 pts)</p>
                          <p className="font-playfair text-base text-text-light">
                            {weapons[acc.accusation.weapon] || acc.accusation.weapon}
                          </p>
                        </div>

                        {/* Raisonnement */}
                        <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4">
                          <p className="font-inter text-xs text-text-muted mb-2">RAISONNEMENT</p>
                          <p className="font-inter text-sm text-text-light whitespace-pre-wrap">
                            {acc.accusation.reasoning}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Back Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => router.push('/admin')}
                className="font-inter text-text-muted text-sm hover:text-accent-gold transition-colors flex items-center gap-2 mx-auto"
              >
                <span>←</span>
                Retour au panel admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
