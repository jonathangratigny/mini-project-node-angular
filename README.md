# Mini Project Node Angular

Ce projet est une application de gestion de tâches construite avec Node.js pour le backend et Angular pour le frontend.

## Structure du projet

```
mini-project-node-angular/
├── backend/      # API Node.js (Express)
│   ├── index.js
│   ├── init-db.js
│   ├── models.js
│   └── package.json
├── frontend/     # Application Angular
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
└── README.md     # Ce fichier
```

## Installation

### Prérequis
- Node.js >= 16
- npm

### Backend
1. Accédez au dossier `backend` :
   ```sh
   cd backend
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Lancez le serveur :
   ```sh
   npm start
   ```

### Frontend
1. Accédez au dossier `frontend` :
   ```sh
   cd frontend
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Lancez l'application Angular :
   ```sh
   npm start
   ```

## Fonctionnalités
- Ajout, édition, suppression de tâches
- Filtrage et recherche de tâches
- Statut des tâches (à faire / terminé)
- API REST Node.js
- Interface moderne Angular

## Tests
- Les tests unitaires sont disponibles dans `frontend/src/app/*.spec.ts`.
- Pour lancer les tests Angular :
  ```sh
  ng test
  ```

## Configuration
- Le fichier `frontend/src/app.config.json` permet de configurer l'URL de l'API et l'environnement.

## Auteur
- Jonathan Gratigny

## Licence
Ce projet est open-source, sous licence MIT.
