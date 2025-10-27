export const sampleCharacters = [
  {
    name: 'Lady Victoria Ashford',
    title: 'La Maîtresse des Lieux',
    age: 45,
    occupation: 'Aristocrate',
    description: 'Héritière du Manoir Ashford, Lady Victoria est connue pour ses soirées somptueuses et son goût raffiné. Mais derrière ses manières élégantes se cache une femme déterminée à protéger son héritage.',
    background: 'Née dans l\'aristocratie anglaise, Victoria a hérité du manoir à la mort de son père il y a 10 ans. Elle a consacré sa vie à préserver le prestige de la famille Ashford.',
    secrets: [
      'Elle est au bord de la faillite et le manoir est hypothéqué',
      'Elle entretenait une relation secrète avec le défunt',
      'Elle a découvert un testament qui pourrait la déshériter'
    ],
    alibi: 'Dans sa chambre, se préparant pour la soirée entre 20h30 et 21h15',
    relationships: [],
    isMurderer: false,
    occupation: 'Aristocrate et propriétaire du manoir',
  },
  {
    name: 'Dr. Edmund Blackwood',
    title: 'Le Médecin Mystérieux',
    age: 52,
    occupation: 'Médecin',
    description: 'Médecin réputé de Londres, le Dr. Blackwood est un homme taciturne aux méthodes parfois controversées. Son expertise médicale cache de sombres secrets.',
    background: 'Diplômé d\'Oxford, Edmund Blackwood a ouvert une clinique privée à Londres il y a 20 ans. Il compte parmi ses patients l\'élite londonienne.',
    secrets: [
      'Il prescrit des substances illégales à ses patients fortunés',
      'Il a une dette de jeu considérable',
      'Il était en train de falsifier des certificats médicaux'
    ],
    alibi: 'Dans la bibliothèque, consultant des ouvrages médicaux',
    relationships: [],
    isMurderer: false,
    occupation: 'Médecin',
  },
  {
    name: 'Margot Delacroix',
    title: 'L\'Actrice Française',
    age: 28,
    occupation: 'Actrice de théâtre',
    description: 'Star montante du théâtre parisien, Margot fascine par sa beauté et son talent. Mais sa soif de gloire la pousse à des actes désespérés.',
    background: 'Originaire de Marseille, Margot a conquis Paris grâce à son talent et son charisme. Elle est à Londres pour une tournée théâtrale.',
    secrets: [
      'Elle fait chanter plusieurs personnes présentes ce soir',
      'Son vrai nom est Marguerite Dubois, elle a fui la France',
      'Elle était la maîtresse du défunt'
    ],
    alibi: 'Dans le salon de musique, répétant son rôle',
    relationships: [],
    isMurderer: true, // C'est elle l'assassin !
    occupation: 'Actrice de théâtre',
  },
  {
    name: 'Colonel James Hartford',
    title: 'L\'Officier à la Retraite',
    age: 58,
    occupation: 'Officier militaire à la retraite',
    description: 'Ancien héros de guerre, le Colonel Hartford impose le respect par sa prestance militaire. Mais la guerre a laissé des cicatrices invisibles.',
    background: 'Décoré pour sa bravoure durant la Grande Guerre, James Hartford a pris sa retraite en 1920. Il vit désormais de sa pension dans le Surrey.',
    secrets: [
      'Il souffre de stress post-traumatique et a des hallucinations',
      'Il cache une dette d\'honneur envers le défunt',
      'Il a déserté lors d\'une bataille cruciale'
    ],
    alibi: 'Dans le fumoir, jouant au billard avec d\'autres invités',
    relationships: [],
    isMurderer: false,
    occupation: 'Colonel à la retraite',
  },
  {
    name: 'Isabella Romano',
    title: 'La Comtesse Italienne',
    age: 35,
    occupation: 'Comtesse et collectionneuse d\'art',
    description: 'Mystérieuse comtesse italienne, Isabella collectionne l\'art et les secrets avec la même passion. Sa présence au manoir intrigue.',
    background: 'Héritière d\'une fortune italienne, Isabella voyage à travers l\'Europe pour enrichir sa collection d\'œuvres d\'art.',
    secrets: [
      'Elle est en réalité une espionne internationale',
      'Elle recherche un tableau volé caché dans le manoir',
      'Son titre de comtesse est usurpé'
    ],
    alibi: 'Dans la galerie d\'art, admirant les peintures',
    relationships: [],
    isMurderer: false,
    occupation: 'Comtesse et collectionneuse',
  },
  {
    name: 'Thomas Pemberton',
    title: 'Le Banquier',
    age: 42,
    occupation: 'Directeur de banque',
    description: 'Directeur d\'une prestigieuse banque londonienne, Thomas Pemberton incarne la réussite financière. Mais l\'argent ne peut tout acheter.',
    background: 'Fils d\'un modeste comptable, Thomas a gravi tous les échelons de la City grâce à son ambition et son sens des affaires.',
    secrets: [
      'Il détourne des fonds de sa propre banque',
      'Il est ruiné suite à un investissement désastreux',
      'Il était associé à la victime dans une affaire louche'
    ],
    alibi: 'Dans le bureau, passant des appels téléphoniques',
    relationships: [],
    isMurderer: false,
    occupation: 'Directeur de banque',
  },
  {
    name: 'Constance Whitmore',
    title: 'La Gouvernante',
    age: 51,
    occupation: 'Gouvernante',
    description: 'Au service de la famille Ashford depuis 25 ans, Constance connaît tous les secrets du manoir. Sa loyauté sera mise à l\'épreuve.',
    background: 'Entrée au service des Ashford à l\'âge de 26 ans, Constance est devenue indispensable à la bonne marche du manoir.',
    secrets: [
      'Elle est en réalité la demi-sœur de Lady Victoria',
      'Elle a été témoin d\'un meurtre il y a 20 ans',
      'Elle vole discrètement des objets de valeur depuis des années'
    ],
    alibi: 'Supervisant le service en cuisine',
    relationships: [],
    isMurderer: false,
    occupation: 'Gouvernante',
  },
  {
    name: 'Richard Ashford',
    title: 'Le Cousin Prodigue',
    age: 38,
    occupation: 'Explorateur et aventurier',
    description: 'Cousin de Lady Victoria, Richard a passé les 15 dernières années à parcourir le monde. Son retour soudain au manoir soulève des questions.',
    background: 'Parti à 23 ans pour fuir les responsabilités familiales, Richard a vécu d\'expéditions et d\'aventures à travers l\'Afrique et l\'Asie.',
    secrets: [
      'Il revient pour réclamer sa part d\'héritage',
      'Il a contracté des dettes de jeu considérables à l\'étranger',
      'Il connaissait la victime sous une autre identité'
    ],
    alibi: 'Sur la terrasse, fumant un cigare et contemplant le parc',
    relationships: [],
    isMurderer: false,
    occupation: 'Explorateur',
  },
];
