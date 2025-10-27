# 🚀 Démarrage Rapide - Murder Party Ashford

## ✅ Configuration terminée !

Votre application est prête avec :
- ✅ Connexion MongoDB configurée
- ✅ Authentification JWT
- ✅ Page de connexion fonctionnelle
- ✅ Dashboard protégé
- ✅ Scripts de gestion des utilisateurs

## 📋 Étapes pour démarrer

### 1. Vérifier que MongoDB est connecté

Votre URI MongoDB est configurée :
```
mongodb+srv://kikidesurgeres_db_user:***@cluster0.vzdozua.mongodb.net/murder-party-ashford
```

### 2. Créer votre premier utilisateur

Dans le terminal, exécutez :

```bash
cd C:\Users\samue\OneDrive\Documents\GitHub\app-halloween\murder-party-ashford
npm run user:create
```

**Exemple :**
```
Identifiant: admin
Email: admin@ashford.com
Mot de passe: admin123
Rôle (player/gamemaster) [player]: gamemaster
```

### 3. Lancer l'application

```bash
npm run dev
```

### 4. Se connecter

1. Ouvrez http://localhost:3000
2. Cliquez sur "Connexion"
3. Utilisez vos identifiants créés à l'étape 2
4. Vous serez redirigé vers le Dashboard !

## 🎮 Créer des comptes pour vos joueurs

Pour votre soirée murder party, créez un compte pour chaque invité :

```bash
npm run user:create
```

Répétez la commande pour chaque joueur :
- `detective` / detective@ashford.com
- `sherlock` / sherlock@ashford.com
- `poirot` / poirot@ashford.com
- etc.

## 📊 Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer l'application en développement |
| `npm run user:create` | Créer un nouvel utilisateur |
| `npm run user:list` | Voir tous les utilisateurs |
| `npm run user:delete` | Supprimer un utilisateur |

## 🔐 Connexion

- **Page de connexion** : http://localhost:3000/login
- **Dashboard** : http://localhost:3000/dashboard (nécessite connexion)

Les utilisateurs peuvent se connecter avec :
- Leur **identifiant** OU leur **email**
- Leur **mot de passe**

## 🎭 Tester maintenant !

1. **Créez un utilisateur de test** :
   ```bash
   npm run user:create
   ```

2. **Lancez l'app** :
   ```bash
   npm run dev
   ```

3. **Connectez-vous** : http://localhost:3000/login

4. **Explorez le dashboard** !

## ⚠️ Important

- ❌ **L'inscription publique est désactivée**
- ✅ Seul vous (l'admin) pouvez créer des comptes
- 🔒 Les mots de passe sont sécurisés (hashés avec bcrypt)
- 🍪 Les sessions durent 7 jours

## 🐛 Problèmes courants

### "Cannot connect to MongoDB"
Vérifiez que :
- Votre connexion internet fonctionne
- L'URI dans `.env.local` est correcte
- Votre IP est autorisée sur MongoDB Atlas

### "User not found"
- Créez d'abord un utilisateur avec `npm run user:create`
- Vérifiez que l'utilisateur existe : `npm run user:list`

### L'application ne démarre pas
```bash
npm install
npm run dev
```

## 📖 Documentation complète

- **Gestion des utilisateurs** : `GESTION-UTILISATEURS.md`
- **Guide complet** : `README.md`

## ✨ Prochaines étapes

Votre système d'authentification fonctionne ! Maintenant vous pouvez :

1. ✅ Créer la page des personnages (`/characters`)
2. ✅ Créer la page des indices (`/clues`)
3. ✅ Implémenter le système de révélation d'indices
4. ✅ Créer la page d'accusation finale

---

**Besoin d'aide ?** Consultez `GESTION-UTILISATEURS.md` pour plus de détails sur la gestion des comptes.

**Prêt pour votre Murder Party ? 🎭🔍**
