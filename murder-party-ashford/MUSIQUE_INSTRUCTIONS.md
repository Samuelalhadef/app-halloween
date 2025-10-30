# Instructions pour ajouter la musique BBC Sherlock

## Étape 1 : Télécharger la musique

1. Téléchargez le thème de BBC Sherlock au format MP3
2. Renommez le fichier en `sherlock-theme.mp3`

## Étape 2 : Ajouter le fichier au projet

Placez le fichier `sherlock-theme.mp3` dans le dossier `public/` de votre projet :

```
murder-party-ashford/
  ├── public/
  │   └── sherlock-theme.mp3  ← Placez le fichier ici
  ├── app/
  ├── components/
  └── ...
```

## Étape 3 : La musique est prête !

Le composant `BackgroundMusic` est déjà intégré dans la page de jeu. Il cherchera automatiquement le fichier `/sherlock-theme.mp3`.

## Fonctionnalités

- **Bouton flottant** : En bas à droite de l'écran du jeu
- **Lecture/Pause** : Cliquez sur le bouton pour démarrer ou arrêter la musique
- **Contrôle du volume** : Slider qui apparaît quand la musique joue
- **Lecture en boucle** : La musique se répète automatiquement
- **Indicateur visuel** : Affiche "Sherlock Theme" avec une animation quand la musique joue

## Sources possibles pour la musique

1. **YouTube to MP3** : Cherchez "BBC Sherlock Theme" sur YouTube et convertissez
2. **Spotify** : Si vous avez un abonnement, vous pouvez télécharger
3. **Acheter** : Sur iTunes, Amazon Music, etc.

## Remarque importante

Assurez-vous d'avoir les droits d'utilisation de la musique pour votre projet, surtout si c'est à usage public.

## Personnalisation

Pour changer la musique, remplacez simplement le fichier `sherlock-theme.mp3` dans le dossier `public/` par n'importe quel autre fichier MP3 de votre choix.
