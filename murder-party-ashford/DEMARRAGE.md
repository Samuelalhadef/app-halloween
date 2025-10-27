# 🚀 Démarrage Rapide - Murder Party Ashford

## ✅ Système d'Authentification Installé

Votre application dispose maintenant d'un système complet d'authentification!

### 🔐 Fonctionnalités disponibles

1. **Inscription** (`/register`)
   - Identifiant unique (min 3 caractères)
   - Email valide
   - Mot de passe (min 6 caractères)
   - Validation en temps réel

2. **Connexion** (`/login`)
   - Connexion avec identifiant OU email
   - Token JWT sécurisé (valide 7 jours)
   - Cookie HttpOnly pour la sécurité

3. **Protection des routes**
   - Middleware automatique
   - Redirection vers `/login` si non connecté
   - Routes protégées: `/dashboard`, `/characters`, `/clues`, `/timeline`

4. **Dashboard** (`/dashboard`)
   - Vue d'ensemble de l'enquête
   - Statistiques des indices découverts
   - Navigation vers les différentes sections

## 📋 Pour lancer l'application

### 1. Configurer MongoDB

**Option A: MongoDB Atlas (recommandé - cloud gratuit)**
1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Créez un cluster gratuit
3. Dans "Database Access", créez un utilisateur
4. Dans "Network Access", autorisez l'accès depuis n'importe où (0.0.0.0/0)
5. Cliquez sur "Connect" → "Connect your application"
6. Copiez l'URI de connexion
7. Remplacez `<password>` par votre mot de passe dans `.env.local`:

\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/murder-party-ashford
\`\`\`

**Option B: MongoDB Local**
1. Installez MongoDB Community: https://www.mongodb.com/try/download/community
2. Démarrez le service MongoDB
3. L'URI par défaut fonctionne: `mongodb://localhost:27017/murder-party-ashford`

### 2. Vérifier le fichier .env.local

Assurez-vous que votre fichier `.env.local` contient:

\`\`\`env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://votre-username:votre-password@cluster.mongodb.net/murder-party-ashford

# JWT Secret (gardez cette clé secrète et unique!)
JWT_SECRET=gnVtZPYoRGp0GFEU

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3. Lancer l'application

\`\`\`bash
npm run dev
\`\`\`

### 4. Tester l'authentification

1. Ouvrez http://localhost:3000
2. Cliquez sur "Inscription"
3. Créez un compte avec:
   - Identifiant: `detective`
   - Email: `detective@ashford.com`
   - Mot de passe: `123456`
4. Vous serez automatiquement connecté et redirigé vers `/dashboard`

## 🔄 Flux d'authentification

\`\`\`
Page d'accueil (/)
    ↓
    ↓ Clic sur "Inscription"
    ↓
Page d'inscription (/register)
    ↓
    ↓ Formulaire valide
    ↓
API /api/auth/register
    ↓
    ↓ Hash du mot de passe + création utilisateur
    ↓
Token JWT généré + Cookie HttpOnly
    ↓
Redirection vers Dashboard (/dashboard)
\`\`\`

## 🛡️ Sécurité

- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ Tokens JWT sécurisés
- ✅ Cookies HttpOnly (protection XSS)
- ✅ Validation côté serveur
- ✅ Protection CSRF via cookies SameSite
- ✅ Middleware de protection automatique

## 🎮 Prochaines étapes

Maintenant que l'authentification fonctionne, vous pouvez:

1. **Créer la page des personnages** (`/characters`)
   - Afficher les 8 suspects
   - Utiliser les données de `data/sample-characters.ts`

2. **Créer la page des indices** (`/clues`)
   - Système de révélation progressive
   - Marquer les indices comme découverts

3. **Implémenter le système de notes**
   - Permettre aux joueurs de noter leurs suspicions
   - Sauvegarder dans MongoDB

4. **Créer la page d'accusation finale**
   - Formulaire pour accuser un suspect
   - Vérifier si c'est le bon coupable (Margot Delacroix)

## 📞 API Endpoints disponibles

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/auth/register` | POST | Créer un nouveau compte |
| `/api/auth/login` | POST | Se connecter |
| `/api/auth/logout` | POST | Se déconnecter |
| `/api/auth/me` | GET | Récupérer l'utilisateur connecté |

## 🐛 Dépannage

**Erreur de connexion MongoDB:**
- Vérifiez que votre IP est autorisée dans MongoDB Atlas
- Vérifiez que le mot de passe ne contient pas de caractères spéciaux
- Encodez les caractères spéciaux si nécessaire

**"Non authentifié" alors que je suis connecté:**
- Vérifiez que les cookies sont activés dans votre navigateur
- Videz le cache et les cookies
- Vérifiez que `JWT_SECRET` est défini dans `.env.local`

**L'application ne démarre pas:**
\`\`\`bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
npm run dev
\`\`\`

## 📝 Notes importantes

- Le cookie d'authentification expire après 7 jours
- Les routes `/dashboard`, `/characters`, `/clues`, `/timeline` nécessitent une connexion
- Les utilisateurs connectés ne peuvent pas accéder à `/login` ou `/register`
- Le premier utilisateur créé a le rôle "player" par défaut

---

**Besoin d'aide?** Consultez le README.md principal pour plus d'informations!
