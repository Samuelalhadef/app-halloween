# 👥 Gestion des Utilisateurs

L'inscription publique a été désactivée. Seul l'administrateur peut créer des comptes.

## 📋 Prérequis

1. MongoDB doit être configuré et accessible
2. Le fichier `.env.local` doit contenir votre `MONGODB_URI`
3. Installer les dépendances : `npm install`

## 🔧 Commandes disponibles

### 1. Créer un utilisateur

```bash
npm run user:create
```

Le script vous demandera :
- **Identifiant** (min 3 caractères)
- **Email** (format valide)
- **Mot de passe** (min 6 caractères)
- **Rôle** : `player` (par défaut) ou `gamemaster`

**Exemple d'exécution :**
```bash
> npm run user:create

🎭 Murder Party Ashford - Création d'utilisateur

📡 Connexion à MongoDB...
✅ Connecté à MongoDB

Identifiant: detective
Email: detective@ashford.com
Mot de passe: secret123
Rôle (player/gamemaster) [player]: player

📝 Création de l'utilisateur...
✅ Utilisateur créé avec succès!

📋 Détails:
   ID: 67a1b2c3d4e5f6g7h8i9j0k1
   Identifiant: detective
   Email: detective@ashford.com
   Rôle: player

🎉 L'utilisateur peut maintenant se connecter!
```

### 2. Lister tous les utilisateurs

```bash
npm run user:list
```

Affiche tous les utilisateurs avec leurs informations (sauf les mots de passe).

**Exemple :**
```bash
> npm run user:list

🎭 Murder Party Ashford - Liste des utilisateurs

📡 Connexion à MongoDB...
✅ Connecté à MongoDB

📋 3 utilisateur(s) trouvé(s):

1. detective
   Email: detective@ashford.com
   Rôle: player
   Indices découverts: 3
   Créé le: 22/10/2025

2. gamemaster
   Email: admin@ashford.com
   Rôle: gamemaster
   Indices découverts: 0
   Créé le: 22/10/2025

3. sherlock
   Email: sherlock@holmes.com
   Rôle: player
   Indices découverts: 7
   Créé le: 22/10/2025
```

### 3. Supprimer un utilisateur

```bash
npm run user:delete
```

Le script liste tous les utilisateurs puis vous demande lequel supprimer.

**Exemple :**
```bash
> npm run user:delete

🎭 Murder Party Ashford - Suppression d'utilisateur

📡 Connexion à MongoDB...
✅ Connecté à MongoDB

📋 Utilisateurs existants:

1. detective (detective@ashford.com)
2. gamemaster (admin@ashford.com)
3. sherlock (sherlock@holmes.com)

Identifiant ou email de l'utilisateur à supprimer: sherlock
⚠️  Êtes-vous sûr de vouloir supprimer "sherlock" ? (oui/non): oui
✅ Utilisateur "sherlock" supprimé avec succès!
```

## 🎮 Différence entre les rôles

### Player (Joueur)
- Rôle par défaut
- Peut explorer les personnages, indices, chronologie
- Peut faire une accusation finale
- Joue pour résoudre le mystère

### GameMaster (Maître du jeu)
- Accès administrateur (à implémenter)
- Pourra gérer les révélations d'indices
- Pourra voir les statistiques des joueurs
- Pourra réinitialiser les parties

## 📝 Utilisateurs de test suggérés

Pour tester votre murder party, créez ces comptes :

### Compte administrateur
```
Identifiant: admin
Email: admin@ashford.com
Mot de passe: admin123
Rôle: gamemaster
```

### Comptes joueurs
```
Identifiant: player1
Email: player1@ashford.com
Mot de passe: player123
Rôle: player
```

```
Identifiant: player2
Email: player2@ashford.com
Mot de passe: player123
Rôle: player
```

## 🔐 Sécurité

- Les mots de passe sont automatiquement hashés avec bcrypt
- Les scripts nécessitent un accès direct à la base de données
- Les mots de passe ne sont JAMAIS affichés dans la base de données
- Les cookies de session expirent après 7 jours

## ⚠️ Dépannage

### "Cannot find module 'tsx'"
```bash
npm install
```

### "Error connecting to MongoDB"
Vérifiez que :
1. MongoDB est démarré (si local)
2. L'URI dans `.env.local` est correct
3. Votre IP est autorisée (si MongoDB Atlas)

### "Email déjà utilisé"
L'email doit être unique. Utilisez un autre email ou supprimez l'ancien compte.

### "Identifiant déjà utilisé"
L'identifiant doit être unique. Choisissez-en un autre.

## 🚀 Workflow recommandé

1. **Avant votre soirée Murder Party** :
   ```bash
   # Créez les comptes pour tous vos invités
   npm run user:create
   # (Répétez pour chaque invité)

   # Vérifiez que tous les comptes sont créés
   npm run user:list
   ```

2. **Donnez les identifiants à vos invités** (par email, message, etc.)

3. **Pendant la soirée** : Les joueurs se connectent avec leurs identifiants

4. **Après la soirée** :
   ```bash
   # Supprimez les comptes si nécessaire
   npm run user:delete
   ```

## 📧 Communication avec les joueurs

Envoyez ce message à vos invités :

---

**Objet : Votre accès à la Murder Party du Manoir Ashford**

Bonjour,

Vous êtes invité(e) à participer à notre Murder Party interactive !

**Informations de connexion :**
- URL : http://localhost:3000 (ou votre URL de production)
- Identifiant : [identifiant_du_joueur]
- Mot de passe : [mot_de_passe_du_joueur]

**Instructions :**
1. Rendez-vous sur le site
2. Cliquez sur "Connexion"
3. Entrez vos identifiants
4. Explorez les personnages, collectez les indices
5. Démasquez l'assassin avant les autres !

Bonne enquête ! 🔍

---

## 💡 Astuce

Pour créer rapidement plusieurs utilisateurs avec le même mot de passe :
```bash
# Créez un fichier create-multiple-users.sh
for i in {1..5}
do
  echo "Création du joueur $i..."
  npm run user:create <<EOF
joueur$i
joueur$i@ashford.com
password123
player
EOF
done
```

---

**Questions ?** Consultez le README.md principal ou les fichiers de documentation.
