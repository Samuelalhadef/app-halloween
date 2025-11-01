'use client';

import { useState } from 'react';
import { allCharacters } from '@/data/all-characters';
import { relationships, characterGroups, getRelationshipsFor } from '@/data/character-relationships';

interface Character {
  firstName: string;
  lastName: string;
  name: string;
  title: string;
  age: number;
  occupation: string;
  description: string;
  category: string;
}

export default function RelationshipTree() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('Famille Ashford');

  // Obtenir l'emoji basé sur l'occupation/rôle
  const getEmoji = (character: Character): string => {
    const occupation = character.occupation.toLowerCase();
    const category = character.category.toLowerCase();

    if (occupation.includes('cuisin')) return '👩‍🍳';
    if (occupation.includes('majordome')) return '🤵';
    if (occupation.includes('médecin')) return '⚕️';
    if (occupation.includes('apothicaire')) return '⚗️';
    if (occupation.includes('jardinier')) return '🌿';
    if (occupation.includes('gouvernante')) return '👩‍💼';
    if (occupation.includes('femme de chambre')) return '🧹';
    if (occupation.includes('valet')) return '🎩';
    if (occupation.includes('serveur')) return '🍷';
    if (occupation.includes('avocat')) return '⚖️';
    if (occupation.includes('écrivaine')) return '📝';
    if (occupation.includes('chasseur')) return '🦌';
    if (category.includes('ashford')) return '🏰';
    if (category.includes('pemberton')) return '💼';
    if (occupation.includes('aristocrate')) return '👑';
    if (occupation.includes('fiancée') || occupation.includes('fiancé')) return '💍';
    return '👤';
  };

  // Convertir caractère en ID
  const getCharacterId = (character: Character): string => {
    return `${character.firstName.toLowerCase()}-${character.lastName.toLowerCase()}`;
  };

  // Trouver un personnage par ID
  const findCharacterById = (id: string): Character | undefined => {
    return allCharacters.find(c => getCharacterId(c) === id);
  };

  // Obtenir la couleur du type de relation
  const getRelationColor = (type: string): string => {
    switch (type) {
      case 'famille': return 'text-blue-400 border-blue-400';
      case 'mariage': return 'text-pink-400 border-pink-400';
      case 'fiançailles': return 'text-purple-400 border-purple-400';
      case 'emploi': return 'text-gray-400 border-gray-400';
      case 'amitié': return 'text-green-400 border-green-400';
      case 'affaires': return 'text-yellow-400 border-yellow-400';
      case 'romance': return 'text-red-500 border-red-500';
      case 'rivalité': return 'text-orange-500 border-orange-500';
      default: return 'text-text-muted border-text-muted';
    }
  };

  // Obtenir l'emoji du type de relation
  const getRelationEmoji = (type: string): string => {
    switch (type) {
      case 'famille': return '👨‍👩‍👧‍👦';
      case 'mariage': return '💑';
      case 'fiançailles': return '💍';
      case 'emploi': return '💼';
      case 'amitié': return '🤝';
      case 'affaires': return '💰';
      case 'romance': return '❤️';
      case 'rivalité': return '⚔️';
      default: return '🔗';
    }
  };

  // Personnages du groupe sélectionné
  const groupCharacters = characterGroups[selectedGroup as keyof typeof characterGroups] || [];
  const characters = allCharacters.filter(c => groupCharacters.includes(getCharacterId(c)));

  // Relations du personnage sélectionné
  const selectedCharRelations = selectedCharacter ? getRelationshipsFor(selectedCharacter) : [];

  // Vérifier si un personnage a une relation avec le personnage sélectionné
  const hasRelationWith = (charId: string): boolean => {
    if (!selectedCharacter) return false;
    return selectedCharRelations.some(r => r.from === charId || r.to === charId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-playfair text-4xl font-bold text-accent-gold mb-2">
          Arbre des Relations
        </h2>
        <p className="font-inter text-text-muted text-sm">
          Cliquez sur un personnage pour voir ses relations
        </p>
      </div>

      {/* Sélecteur de groupe */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.keys(characterGroups).map(group => (
          <button
            key={group}
            onClick={() => {
              setSelectedGroup(group);
              setSelectedCharacter(null);
            }}
            className={`px-6 py-3 rounded-lg font-inter text-sm font-semibold transition-all ${
              selectedGroup === group
                ? 'bg-accent-gold text-primary-dark shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                : 'bg-accent-gold/10 text-accent-gold border-2 border-accent-gold/30 hover:bg-accent-gold/20'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Panneau gauche: Liste des personnages */}
        <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="font-playfair text-2xl font-bold text-accent-gold mb-4">
            {selectedGroup}
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {characters.map(character => {
              const charId = getCharacterId(character);
              const isSelected = selectedCharacter === charId;
              const hasRelation = hasRelationWith(charId);
              const isHovered = hoveredCharacter === charId;

              return (
                <button
                  key={charId}
                  onClick={() => setSelectedCharacter(isSelected ? null : charId)}
                  onMouseEnter={() => setHoveredCharacter(charId)}
                  onMouseLeave={() => setHoveredCharacter(null)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'bg-accent-gold/20 border-accent-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                      : hasRelation && selectedCharacter
                      ? 'bg-accent-crimson/10 border-accent-crimson/50'
                      : isHovered
                      ? 'bg-accent-gold/10 border-accent-gold/60'
                      : 'bg-transparent border-accent-gold/20 hover:border-accent-gold/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getEmoji(character)}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-playfair font-bold text-text-light truncate">
                        {character.name}
                      </h4>
                      <p className="font-inter text-xs text-text-muted truncate">
                        {character.title}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="text-accent-gold text-xl">✓</span>
                    )}
                    {hasRelation && selectedCharacter && !isSelected && (
                      <span className="text-accent-crimson text-xl">🔗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panneau droit: Relations du personnage sélectionné */}
        <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-6 backdrop-blur-sm">
          {selectedCharacter ? (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{getEmoji(findCharacterById(selectedCharacter)!)}</span>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-accent-gold">
                      {findCharacterById(selectedCharacter)?.name}
                    </h3>
                    <p className="font-inter text-sm text-text-muted">
                      {findCharacterById(selectedCharacter)?.title}
                    </p>
                  </div>
                </div>
                <p className="font-inter text-sm text-text-gray leading-relaxed">
                  {findCharacterById(selectedCharacter)?.description}
                </p>
              </div>

              <h4 className="font-playfair text-xl font-bold text-accent-gold mb-4">
                Relations ({selectedCharRelations.length})
              </h4>

              <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {selectedCharRelations.length > 0 ? (
                  selectedCharRelations.map((relation, idx) => {
                    const otherCharId = relation.from === selectedCharacter ? relation.to : relation.from;
                    const otherChar = findCharacterById(otherCharId);
                    const isOutgoing = relation.from === selectedCharacter;

                    if (!otherChar) return null;

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedCharacter(otherCharId)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] ${getRelationColor(relation.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{getEmoji(otherChar)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{getRelationEmoji(relation.type)}</span>
                              <h5 className="font-playfair font-bold text-text-light truncate">
                                {otherChar.name}
                              </h5>
                            </div>
                            <p className="font-inter text-xs mb-2 capitalize">
                              {isOutgoing ? relation.label : `${relation.label.split(' ')[0]} par`}
                            </p>
                            <p className="font-inter text-xs text-text-muted truncate">
                              {otherChar.title}
                            </p>
                          </div>
                          <span className="text-text-muted text-sm">→</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-3 block opacity-50">🔍</span>
                    <p className="font-inter text-text-muted text-sm">
                      Aucune relation connue
                    </p>
                  </div>
                )}
              </div>

              {/* Légende */}
              <div className="mt-6 pt-4 border-t border-accent-gold/30">
                <h5 className="font-inter text-xs font-semibold text-text-muted mb-2">TYPES DE RELATIONS</h5>
                <div className="grid grid-cols-2 gap-2">
                  {['famille', 'mariage', 'fiançailles', 'emploi', 'amitié', 'affaires', 'romance', 'rivalité'].map(type => (
                    <div key={type} className="flex items-center gap-2">
                      <span className="text-sm">{getRelationEmoji(type)}</span>
                      <span className={`font-inter text-xs capitalize ${getRelationColor(type).split(' ')[0]}`}>
                        {type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <span className="text-8xl mb-6 opacity-30">👥</span>
              <h3 className="font-playfair text-2xl font-bold text-text-light mb-3">
                Sélectionnez un personnage
              </h3>
              <p className="font-inter text-sm text-text-muted text-center max-w-md">
                Cliquez sur un personnage à gauche pour voir toutes ses relations avec les autres membres du manoir
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(212, 175, 55, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
}
