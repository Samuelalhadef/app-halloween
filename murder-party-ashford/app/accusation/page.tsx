'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccusationPage() {
  const router = useRouter();
  const [murderer, setMurderer] = useState<string>('');
  const [accomplices, setAccomplices] = useState<string[]>([]);
  const [motive, setMotive] = useState<string>('');
  const [causeOfDeath, setCauseOfDeath] = useState<string>('');
  const [weapon, setWeapon] = useState<string>('');
  const [reasoning, setReasoning] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [searchMurderer, setSearchMurderer] = useState('');
  const [searchAccomplice, setSearchAccomplice] = useState('');

  const suspects = [
    { id: 'margaret', name: 'Margaret Walsh', role: 'Cuisinière', emoji: '👩‍🍳' },
    { id: 'albert', name: 'Albert Whitmore', role: 'Majordome', emoji: '🤵' },
    { id: 'thomas', name: 'Thomas Ashford', role: 'Fils', emoji: '👨‍💼' },
    { id: 'catherine', name: 'Catherine Ashford', role: 'Épouse', emoji: '👩' },
    { id: 'sebastian', name: 'Sebastian Ashford', role: 'Fils', emoji: '🎩' },
    { id: 'helena', name: 'Helena Ashford', role: 'Sœur', emoji: '👩‍🦰' },
    { id: 'reginald', name: 'Lord Reginald', role: 'Rival', emoji: '🧐' },
    { id: 'silas', name: 'Silas Thorne', role: 'Apothicaire', emoji: '⚗️' },
  ];

  const motives = [
    { id: 'heritage', name: 'Héritage', emoji: '💰' },
    { id: 'vengeance', name: 'Vengeance', emoji: '⚔️' },
    { id: 'jalousie', name: 'Jalousie', emoji: '💔' },
    { id: 'secret', name: 'Secret familial', emoji: '🔒' },
    { id: 'argent', name: 'Dette d\'argent', emoji: '💸' },
    { id: 'pouvoir', name: 'Pouvoir', emoji: '👑' },
  ];

  const causesOfDeath = [
    { id: 'poison', name: 'Empoisonnement', emoji: '☠️' },
    { id: 'coup', name: 'Coup violent', emoji: '🔨' },
    { id: 'etouffement', name: 'Étouffement', emoji: '😶' },
    { id: 'chute', name: 'Chute mortelle', emoji: '⬇️' },
    { id: 'accident', name: 'Accident', emoji: '⚠️' },
  ];

  const weapons = [
    { id: 'arsenic', name: 'Arsenic', emoji: '⚗️' },
    { id: 'corde', name: 'Corde', emoji: '🪢' },
    { id: 'couteau', name: 'Couteau', emoji: '🔪' },
    { id: 'chandelier', name: 'Chandelier', emoji: '🕯️' },
    { id: 'oreiller', name: 'Oreiller', emoji: '🛏️' },
    { id: 'revolver', name: 'Revolver', emoji: '🔫' },
    { id: 'graisse', name: 'Graisse sur l\'escalier', emoji: '🧴' },
  ];

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà soumis une accusation
    const checkAccusation = async () => {
      try {
        const response = await fetch('/api/accusations/submit');
        if (response.ok) {
          const data = await response.json();
          if (data.accusation) {
            setHasSubmitted(true);
          }
        }
      } catch (err) {
        console.error('Error checking accusation:', err);
      }
    };

    checkAccusation();
  }, []);

  const toggleAccomplice = (suspectId: string) => {
    if (accomplices.includes(suspectId)) {
      setAccomplices(accomplices.filter(id => id !== suspectId));
    } else {
      setAccomplices([...accomplices, suspectId]);
    }
  };

  // Filtrer les suspects pour le meurtrier
  const filteredMurdererSuspects = suspects.filter(s =>
    s.name.toLowerCase().includes(searchMurderer.toLowerCase()) ||
    s.role.toLowerCase().includes(searchMurderer.toLowerCase())
  );

  // Filtrer les suspects pour les complices
  const filteredAccompliceSuspects = suspects.filter(s =>
    s.id !== murderer &&
    (s.name.toLowerCase().includes(searchAccomplice.toLowerCase()) ||
    s.role.toLowerCase().includes(searchAccomplice.toLowerCase()))
  );

  const handleSubmit = () => {
    setError('');

    if (!murderer) {
      setError('Veuillez sélectionner le meurtrier');
      return;
    }

    if (!motive) {
      setError('Veuillez sélectionner le mobile');
      return;
    }

    if (!causeOfDeath) {
      setError('Veuillez sélectionner la cause de mort');
      return;
    }

    if (!weapon) {
      setError('Veuillez sélectionner l\'arme ou la méthode');
      return;
    }

    // Le raisonnement est optionnel mais limité à 1000 caractères
    if (reasoning.length > 1000) {
      setError('Le raisonnement ne peut pas dépasser 1000 caractères');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmAccusation = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/accusations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          murderer,
          accomplices,
          motive,
          causeOfDeath,
          weapon,
          reasoning,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/game');
      } else {
        setError(data.error || 'Erreur lors de la soumission');
        setShowConfirmation(false);
      }
    } catch (err) {
      setError('Erreur de connexion');
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  if (hasSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0e0d] via-[#1a2420] to-[#0f1512] flex items-center justify-center">
        <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-8 max-w-md mx-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-accent-gold mb-4">Accusation déjà soumise</h2>
          <p className="font-inter text-text-light mb-6">
            Vous avez déjà soumis votre accusation finale. Veuillez attendre que l&apos;administrateur valide toutes les accusations.
          </p>
          <button
            onClick={() => router.push('/game')}
            className="font-inter text-text-muted hover:text-accent-gold transition-colors"
          >
            ← Retour au jeu
          </button>
        </div>
      </div>
    );
  }

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
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-accent-crimson/30 opacity-50"></div>
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-accent-crimson/30 opacity-50"></div>

      <div className="relative z-10 min-h-screen px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl font-bold text-accent-crimson mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(153,27,27,0.5)]">
              ACCUSATION FINALE
            </h1>
            <p className="font-inter text-text-muted text-sm tracking-widest mb-6">RÉSOLVEZ LE MYSTÈRE DU MANOIR ASHFORD</p>
            <div className="inline-flex items-center gap-2 bg-accent-crimson/20 border border-accent-crimson/40 rounded-lg px-4 py-2">
              <span className="text-2xl">⚠️</span>
              <span className="font-inter text-text-light text-sm">
                Attention : Cette décision est définitive et ne peut être modifiée
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
              <p className="font-inter text-red-400">{error}</p>
            </div>
          )}

          {/* Meurtrier */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4 flex items-center gap-2">
              <span>1. Le Meurtrier</span>
              <span className="text-sm font-inter font-normal text-text-muted">(+100 pts)</span>
            </h2>
            {/* Barre de recherche */}
            <div className="mb-4">
              <input
                type="text"
                value={searchMurderer}
                onChange={(e) => setSearchMurderer(e.target.value)}
                placeholder="🔍 Rechercher un suspect..."
                className="w-full bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg px-4 py-3 text-text-light font-inter text-sm focus:border-accent-gold/60 focus:outline-none"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredMurdererSuspects.map((suspect) => (
                <button
                  key={suspect.id}
                  onClick={() => setMurderer(suspect.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    murderer === suspect.id
                      ? 'bg-accent-crimson/20 border-accent-crimson/60 shadow-[0_0_30px_rgba(153,27,27,0.4)]'
                      : 'bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-accent-gold/40 hover:border-accent-gold/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{suspect.emoji}</span>
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-text-light">{suspect.name}</h3>
                      <p className="font-inter text-xs text-text-muted">{suspect.role}</p>
                    </div>
                    {murderer === suspect.id && (
                      <span className="ml-auto text-accent-crimson text-2xl">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Complices */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4 flex items-center gap-2">
              <span>2. Les Complices</span>
              <span className="text-sm font-inter font-normal text-text-muted">(+30 pts chacun)</span>
            </h2>
            <p className="font-inter text-sm text-text-muted mb-4">Sélectionnez un ou plusieurs complices (optionnel)</p>
            {/* Barre de recherche */}
            <div className="mb-4">
              <input
                type="text"
                value={searchAccomplice}
                onChange={(e) => setSearchAccomplice(e.target.value)}
                placeholder="🔍 Rechercher un complice..."
                className="w-full bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg px-4 py-3 text-text-light font-inter text-sm focus:border-accent-gold/60 focus:outline-none"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredAccompliceSuspects.map((suspect) => (
                <button
                  key={suspect.id}
                  onClick={() => toggleAccomplice(suspect.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    accomplices.includes(suspect.id)
                      ? 'bg-accent-gold/10 border-accent-gold/60'
                      : 'bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-accent-gold/20 hover:border-accent-gold/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{suspect.emoji}</span>
                    <div>
                      <h3 className="font-playfair text-base font-bold text-text-light">{suspect.name}</h3>
                      <p className="font-inter text-xs text-text-muted">{suspect.role}</p>
                    </div>
                    {accomplices.includes(suspect.id) && (
                      <span className="ml-auto text-accent-gold text-xl">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4 flex items-center gap-2">
              <span>3. Le Mobile</span>
              <span className="text-sm font-inter font-normal text-text-muted">(+65 pts)</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {motives.map((mot) => (
                <button
                  key={mot.id}
                  onClick={() => setMotive(mot.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    motive === mot.id
                      ? 'bg-accent-gold/20 border-accent-gold/60'
                      : 'bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-accent-gold/20 hover:border-accent-gold/40'
                  }`}
                >
                  <span className="text-3xl block mb-2">{mot.emoji}</span>
                  <p className="font-inter text-sm text-text-light">{mot.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cause de mort */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4 flex items-center gap-2">
              <span>4. La Cause de Mort</span>
              <span className="text-sm font-inter font-normal text-text-muted">(+50 pts)</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {causesOfDeath.map((cause) => (
                <button
                  key={cause.id}
                  onClick={() => setCauseOfDeath(cause.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    causeOfDeath === cause.id
                      ? 'bg-accent-gold/20 border-accent-gold/60'
                      : 'bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-accent-gold/20 hover:border-accent-gold/40'
                  }`}
                >
                  <span className="text-3xl block mb-2">{cause.emoji}</span>
                  <p className="font-inter text-sm text-text-light">{cause.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Arme/Méthode */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4 flex items-center gap-2">
              <span>5. L&apos;Arme ou Méthode</span>
              <span className="text-sm font-inter font-normal text-text-muted">(+30 pts)</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {weapons.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWeapon(w.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    weapon === w.id
                      ? 'bg-accent-gold/20 border-accent-gold/60'
                      : 'bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-accent-gold/20 hover:border-accent-gold/40'
                  }`}
                >
                  <span className="text-3xl block mb-2">{w.emoji}</span>
                  <p className="font-inter text-sm text-text-light">{w.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Raisonnement */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-4 flex items-center gap-2">
              <span>6. Votre Raisonnement</span>
              <span className="text-sm font-inter font-normal text-text-muted">(Optionnel - pour départager)</span>
            </h2>
            <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-6">
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                placeholder="Exposez votre raisonnement complet (optionnel, utilisé pour départager en cas d'égalité)..."
                className="w-full bg-transparent text-text-light font-inter text-sm border-none outline-none resize-none"
                rows={6}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2 text-xs text-text-muted">
                <span>{reasoning.length}/1000 caractères</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-accent-crimson hover:bg-accent-crimson/80 text-white font-playfair text-xl px-12 py-4 rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(153,27,27,0.4)] hover:shadow-[0_0_50px_rgba(153,27,27,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Soumettre l&apos;Accusation Finale
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => router.push('/game')}
              className="font-inter text-text-muted text-sm hover:text-accent-gold transition-colors"
            >
              ← Retour au jeu
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-gradient-to-br from-[#1a2420] to-[#0f1512] border-2 border-accent-crimson rounded-lg p-8 max-w-md">
            <h3 className="font-playfair text-3xl font-bold text-accent-crimson mb-4 text-center">
              Confirmer l&apos;accusation
            </h3>
            <p className="font-inter text-text-light mb-6 text-center">
              Êtes-vous certain de votre accusation ? Cette décision est <span className="text-accent-crimson font-bold">définitive</span> et ne pourra pas être modifiée.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={loading}
                className="flex-1 bg-transparent border-2 border-text-muted text-text-light font-inter px-6 py-3 rounded-lg hover:border-accent-gold transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmAccusation}
                disabled={loading}
                className="flex-1 bg-accent-crimson hover:bg-accent-crimson/80 text-white font-inter px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'En cours...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
