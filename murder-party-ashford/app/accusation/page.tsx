'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccusationPage() {
  const router = useRouter();
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleSubmit = () => {
    if (!selectedSuspect || !reasoning.trim()) {
      return;
    }
    setShowConfirmation(true);
  };

  const confirmAccusation = () => {
    // Ici, vous pouvez envoyer l'accusation à l'API
    console.log('Accusation soumise:', { suspect: selectedSuspect, reasoning });
    router.push('/result');
  };

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl font-bold text-accent-crimson mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(153,27,27,0.5)]">
              ACCUSATION FINALE
            </h1>
            <p className="font-inter text-text-muted text-sm tracking-widest mb-6">QUI EST LE MEURTRIER ?</p>
            <div className="inline-flex items-center gap-2 bg-accent-crimson/20 border border-accent-crimson/40 rounded-lg px-4 py-2">
              <span className="text-2xl">⚠️</span>
              <span className="font-inter text-text-light text-sm">
                Attention : Cette décision est définitive et ne peut être modifiée
              </span>
            </div>
          </div>

          {/* Suspects Grid */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-6">Sélectionnez le coupable</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {suspects.map((suspect) => (
                <button
                  key={suspect.id}
                  onClick={() => setSelectedSuspect(suspect.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedSuspect === suspect.id
                      ? 'bg-accent-crimson/20 border-accent-crimson/60 shadow-[0_0_30px_rgba(153,27,27,0.4)]'
                      : 'bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-accent-gold/40 hover:border-accent-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{suspect.emoji}</span>
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-text-light">{suspect.name}</h3>
                      <p className="font-inter text-sm text-text-muted">{suspect.role}</p>
                    </div>
                    {selectedSuspect === suspect.id && (
                      <span className="ml-auto text-accent-crimson text-2xl">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reasoning */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl font-bold text-accent-gold mb-6">Exposez votre raisonnement</h2>
            <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-6 shadow-[0_0_40px_rgba(212,175,55,0.2)] backdrop-blur-sm">
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                placeholder="Expliquez comment vous êtes arrivé à cette conclusion. Quels indices vous ont mené à ce suspect ? Quel était le mobile et l'opportunité ?"
                className="w-full bg-[#0f1512]/50 border border-accent-gold/30 rounded-lg px-4 py-3 text-text-light font-inter placeholder-text-muted focus:outline-none focus:border-accent-gold/60 focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all min-h-[200px] resize-none"
                maxLength={1000}
              />
              <div className="mt-2 flex justify-between items-center">
                <span className="font-inter text-xs text-text-muted">
                  Minimum 50 caractères recommandés
                </span>
                <span className="font-inter text-xs text-text-muted">
                  {reasoning.length} / 1000
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/game')}
              className="flex-1 py-4 rounded-lg border-2 border-accent-gold/40 bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 text-text-light font-playfair font-semibold hover:border-accent-gold/60 transition-all backdrop-blur-sm"
            >
              Retour au jeu
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedSuspect || reasoning.trim().length < 10}
              className={`flex-1 py-4 rounded-lg border-2 font-playfair font-semibold text-lg transition-all ${
                !selectedSuspect || reasoning.trim().length < 10
                  ? 'border-text-muted/20 bg-[#0f1512]/50 text-text-muted cursor-not-allowed'
                  : 'border-accent-crimson/60 bg-gradient-to-br from-accent-crimson/20 to-accent-burgundy/20 text-text-light hover:shadow-[0_0_40px_rgba(153,27,27,0.5)] hover:border-accent-crimson/80'
              }`}
            >
              ⚖️ Soumettre l'accusation
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#1a2420] to-[#0f1512] border-2 border-accent-crimson/60 rounded-lg p-8 max-w-md mx-4 shadow-[0_0_60px_rgba(153,27,27,0.6)]">
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">⚠️</span>
              <h3 className="font-playfair text-3xl font-bold text-accent-crimson mb-4">Confirmation</h3>
              <p className="font-inter text-text-light mb-2">
                Vous accusez <span className="font-bold text-accent-gold">
                  {suspects.find(s => s.id === selectedSuspect)?.name}
                </span> du meurtre de Lord Edmund Ashford.
              </p>
              <p className="font-inter text-text-muted text-sm">
                Cette action est irréversible. Êtes-vous certain ?
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 rounded-lg border-2 border-accent-gold/40 bg-[#0f1512]/50 text-text-light font-playfair font-semibold hover:border-accent-gold/60 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={confirmAccusation}
                className="flex-1 py-3 rounded-lg border-2 border-accent-crimson/60 bg-gradient-to-br from-accent-crimson/30 to-accent-burgundy/30 text-text-light font-playfair font-semibold hover:shadow-[0_0_30px_rgba(153,27,27,0.5)] transition-all"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
