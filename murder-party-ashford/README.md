# Murder Party Ashford - Application Web

Une application web immersive pour une murder party dans l'ambiance des années 20.

## 🎭 Concept

**Date**: 31 octobre 1925
**Lieu**: Le Manoir Ashford
**Événement**: Une soirée mondaine tourne au cauchemar lorsqu'un meurtre est commis.

Les joueurs doivent enquêter, interroger les suspects (8 personnages), collecter des indices et résoudre le mystère avant la fin de la soirée.

## 🚀 Technologies Utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling avec palette personnalisée années 20
- **MongoDB** - Base de données
- **Mongoose** - ODM pour MongoDB
- **bcryptjs** - Hash des mots de passe
- **JWT** - Authentification

## 🎨 Palette de Couleurs

- **Primaire**: Noir profond (#1a1a1a, #0a0a0a)
- **Secondaire**: Gris foncé (#2d2d2d, #3d3d3d)
- **Accents**: Or (#d4af37), Bordeaux (#800020), Rouge sang (#8b0000)
- **Texte**: Blanc cassé (#f5f5f5), Gris (#b0b0b0)

## 📦 Installation

1. **Cloner le repository**
```bash
cd murder-party-ashford
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine du projet (déjà créé) :
```env
MONGODB_URI=mongodb://localhost:27017/murder-party-ashford
JWT_SECRET=votre-clé-secrète-très-sécurisée
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Installer MongoDB**

- **Windows**: [Télécharger MongoDB](https://www.mongodb.com/try/download/community)
- **Mac**: `brew install mongodb-community`
- **Linux**: Suivez la [documentation officielle](https://docs.mongodb.com/manual/installation/)

Ou utilisez **MongoDB Atlas** (cloud) gratuitement.

5. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
murder-party-ashford/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   ├── Button.tsx         # Boutons stylisés
│   ├── Card.tsx           # Cartes d'information
│   ├── Header.tsx         # En-tête
│   └── Footer.tsx         # Pied de page
├── models/                # Modèles Mongoose
│   ├── Character.ts       # Personnages
│   ├── Clue.ts           # Indices
│   └── User.ts           # Utilisateurs
├── lib/                   # Utilitaires
│   ├── mongodb.ts        # Connexion MongoDB (client)
│   └── mongoose.ts       # Connexion Mongoose
├── data/                  # Données d'exemple
│   ├── sample-characters.ts  # 8 personnages
│   └── sample-clues.ts       # 12 indices
└── .env.local            # Variables d'environnement
```

## 🎮 Personnages

### Les 8 Suspects

1. **Lady Victoria Ashford** - La maîtresse des lieux (45 ans)
2. **Dr. Edmund Blackwood** - Le médecin mystérieux (52 ans)
3. **Margot Delacroix** - L'actrice française (28 ans) ⚠️ **C'est l'assassin !**
4. **Colonel James Hartford** - L'officier à la retraite (58 ans)
5. **Isabella Romano** - La comtesse italienne (35 ans)
6. **Thomas Pemberton** - Le banquier (42 ans)
7. **Constance Whitmore** - La gouvernante (51 ans)
8. **Richard Ashford** - Le cousin prodigue (38 ans)

## 🔍 Indices

L'application contient **12 indices** répartis dans différents lieux du manoir :
- Indices physiques (verre empoisonné, mouchoir, fiole)
- Documents (lettres, télégrammes, programmes)
- Témoignages (majordome, gouvernante, Colonel)
- **2 fausses pistes** pour corser l'enquête

## 🛠️ Prochaines Étapes

Pour compléter l'application, vous pouvez ajouter :

1. **Système d'authentification**
   - Page de connexion/inscription
   - API routes pour JWT
   - Middleware de protection

2. **Pages d'enquête**
   - `/characters` - Liste des personnages avec détails
   - `/clues` - Indices découverts
   - `/timeline` - Chronologie des événements
   - `/accusation` - Formulaire d'accusation finale

3. **Fonctionnalités interactives**
   - Chat en temps réel entre joueurs
   - Système de révélation progressive des indices
   - Tableau d'enquête pour noter les suspicions
   - Timer de la soirée

4. **Dashboard Game Master**
   - Gestion des joueurs
   - Révélation manuelle d'indices
   - Statistiques de progression

## 🎯 Scripts Disponibles

```bash
npm run dev      # Développement
npm run build    # Build de production
npm start        # Lancer en production
npm run lint     # Vérifier le code
```

## 📝 Notes

- L'assassin est **Margot Delacroix**, l'actrice française
- Elle a empoisonné la victime avec du cyanure à 21h05
- Les indices convergent vers elle progressivement
- 2 indices sont des fausses pistes (couteau, confession du Colonel)

## 🤝 Contribution

Cette application est conçue pour être extensible. N'hésitez pas à ajouter :
- De nouveaux personnages
- Des indices supplémentaires
- Des mini-jeux
- Des effets sonores et musiques d'époque

## 📄 Licence

Projet personnel - Murder Party Ashford © 2025

---

**Bon jeu et bonne enquête ! 🔎**
