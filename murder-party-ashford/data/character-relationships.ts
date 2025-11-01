export interface Relationship {
  from: string; // firstName-lastName
  to: string;
  type: 'famille' | 'mariage' | 'fiançailles' | 'emploi' | 'amitié' | 'affaires' | 'romance' | 'rivalité';
  label: string;
}

export const relationships: Relationship[] = [
  // FAMILLE ASHFORD - Relations familiales
  { from: 'catherine-ashford', to: 'thomas-ashford', type: 'famille', label: 'Mère de' },
  { from: 'catherine-ashford', to: 'sebastian-ashford', type: 'famille', label: 'Mère de' },
  { from: 'helena-ashford', to: 'catherine-ashford', type: 'famille', label: 'Belle-sœur de' },

  // Mariages et fiançailles
  { from: 'thomas-ashford', to: 'penelope-pemberton', type: 'fiançailles', label: 'Fiancé à' },
  { from: 'sebastian-ashford', to: 'violet-ashcroft', type: 'rivalité', label: 'Ex-fiancé de' },
  { from: 'charles-pemberton', to: 'victoria-pemberton', type: 'mariage', label: 'Époux de' },
  { from: 'reginald-worthington', to: 'millicent-worthington', type: 'mariage', label: 'Époux de' },
  { from: 'jonathan-price', to: 'eleanor-price', type: 'mariage', label: 'Époux de' },
  { from: 'constance-fairfax', to: 'marcus-fairfax', type: 'mariage', label: 'Épouse de' },

  // FAMILLE PEMBERTON
  { from: 'charles-pemberton', to: 'penelope-pemberton', type: 'famille', label: 'Père de' },
  { from: 'victoria-pemberton', to: 'penelope-pemberton', type: 'famille', label: 'Mère de' },

  // FAMILLE ASHCROFT
  { from: 'gregory-ashcroft', to: 'violet-ashcroft', type: 'famille', label: 'Père de' },

  // DOMESTIQUES - Hiérarchie et relations
  { from: 'albert-whitmore', to: 'margaret-walsh', type: 'emploi', label: 'Supervise' },
  { from: 'albert-whitmore', to: 'rose-bennett', type: 'emploi', label: 'Supervise' },
  { from: 'albert-whitmore', to: 'harold-graves', type: 'emploi', label: 'Supervise' },
  { from: 'margaret-walsh', to: 'rose-bennett', type: 'emploi', label: 'Chef de' },
  { from: 'beatrice-harlow', to: 'emily-clarke', type: 'emploi', label: 'Supervise' },
  { from: 'beatrice-harlow', to: 'lucy-morrison', type: 'emploi', label: 'Supervise' },
  { from: 'emily-clarke', to: 'penelope-pemberton', type: 'emploi', label: 'Sert' },

  // AMITIÉS
  { from: 'thomas-ashford', to: 'oliver-blackwood', type: 'amitié', label: 'Ami d\'Oxford' },
  { from: 'catherine-ashford', to: 'constance-fairfax', type: 'amitié', label: 'Amie d\'enfance' },
  { from: 'catherine-ashford', to: 'eleanor-price', type: 'amitié', label: 'Amie de' },

  // RELATIONS D'AFFAIRES
  { from: 'charles-pemberton', to: 'thomas-ashford', type: 'affaires', label: 'Futur beau-père de' },
  { from: 'jonathan-price', to: 'sebastian-ashford', type: 'affaires', label: 'Créancier de' },
  { from: 'reginald-worthington', to: 'helena-ashford', type: 'rivalité', label: 'Rival d\'affaires de' },

  // PROFESSIONNELS ET RELATIONS DE SERVICE
  { from: 'arthur-finch', to: 'catherine-ashford', type: 'emploi', label: 'Médecin de famille' },

  // TENSIONS ET RANCUNES
  { from: 'gregory-ashcroft', to: 'sebastian-ashford', type: 'rivalité', label: 'En veut à' },
  { from: 'agatha-crane', to: 'helena-ashford', type: 'amitié', label: 'Écrit sur' },
];

// Groupes pour l'arbre visuel
export const characterGroups = {
  'Famille Ashford': [
    'catherine-ashford',
    'thomas-ashford',
    'sebastian-ashford',
    'helena-ashford'
  ],
  'Famille Pemberton': [
    'charles-pemberton',
    'victoria-pemberton',
    'penelope-pemberton'
  ],
  'Domestiques': [
    'albert-whitmore',
    'margaret-walsh',
    'rose-bennett',
    'harold-graves',
    'emily-clarke',
    'george-thornton',
    'beatrice-harlow',
    'lucy-morrison'
  ],
  'Invités Aristocrates': [
    'reginald-worthington',
    'millicent-worthington',
    'jonathan-price',
    'eleanor-price',
    'violet-ashcroft',
    'gregory-ashcroft',
    'constance-fairfax',
    'marcus-fairfax',
    'agatha-crane'
  ],
  'Amis et Professionnels': [
    'oliver-blackwood',
    'arthur-finch',
    'silas-thorne',
    'james-crawford'
  ]
};

// Fonction utilitaire pour obtenir toutes les relations d'un personnage
export function getRelationshipsFor(characterId: string): Relationship[] {
  return relationships.filter(r => r.from === characterId || r.to === characterId);
}

// Fonction pour obtenir le type de relation entre deux personnages
export function getRelationshipBetween(char1: string, char2: string): Relationship | undefined {
  return relationships.find(r =>
    (r.from === char1 && r.to === char2) ||
    (r.from === char2 && r.to === char1)
  );
}
