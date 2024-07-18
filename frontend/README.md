# Projet Checkpoint 4

## Démarche

Le projet étant un checkpoint; j'ai utilisé plusieurs approches pour des problématiques
similaires. Pour accéder à certaines données de l'API j'ai notamment utilisé
React-router-dom sur les pages lorsque la données devait être immediatement accessible.

J ai également utilisé useEffect lorsqu une mise à jour du rendu etait
nécessaire. Bien entendu, il s'agit d'un exercice qui nuit à la cohérence du code mais qui
permet d exposer la maniere de coder diverses technologies.

Concernant le style, j'ai utilisé SASS à 3 niveaux : d'une part pour fabriquer un systeme de coloration
des inputs et boutons par simple nommage de class (à la maniere de Tailwind), pour
l'indentation ainsi que pour la définition des variables css.

Le back et le front doivent respectivement être lancés chacun avec NPM run dev.
La base de données doit être simplement connectée; le back faisant le nécessaire lors du premier lancement

### Principes

Le programme n'est utilisable qu apres authentification.
Il repose sur deux natures de role :

- Sellers - Vendeur ayant emis un ou des comptes rendus pour des visites commerciales aupres de clients.
  Les sellers peuvent creer, voir, exporter en pdf ainsi que modifier ou supprimer leurs rapports commerciaux.
  Ils n ont acces qu a leurs propres et ne peuvent en creer que pour eux memes.
- Admin - Administrateur ayant acces aux rapports ainsi qu a une interface de monitoring comptabilisant les ventes aupres des clients, et projettant les evolutions atendues en terme de chiffre d affaire et de volume de vente.

### Connexion

Tous les utilisateurs ont pour mot de passe !!Clorigay11
Il existe un compte administrateur ayant pour :

- identifiant : tristanlaroye@hotmail.com
- mot de passe : !!Clorigay11

## Technologies

### MongoDB Community

Coté Backend, MongoDB est exploité en server local MongoDb Community Server mais il est transposable à Atlas sans difficulté.
Le peuplement de la base de données se fait a l'aide d'un script node seed.js à
executer direcement dans le dossier avant de lancer l'application.

### Variables d environnement

Seules deux variables d environnement sont utilisées :
L uri de connexion à MongoDB et le port du server express.

### Seeder

Afin de rendre l'application plus dynamique; j'ai crée un fichier seed.js
Il doit servir à peupler lq base de données.
Le seeder s appuie sur faker pour générer des personnes et rapports fictifs.

### CORS

La configuration CORS est située dans le fichier setCorsConfiguration.middleware.
Elle accepte les requetes exclusivement provenant de http://localhost:5173 pour correspondre à l'adresse par défaut sous viteJs.

### Packages utilisés

"chart.js": "^4.4.3",
"dotenv": "^16.4.5",
"react": "^18.3.1",
"react-chartjs-2": "^5.2.0",
"react-dom": "^18.3.1",
"react-router-dom": "^6.24.1",
"react-to-pdf": "^1.0.1"
"@types/react": "^18.3.3",
"@types/react-dom": "^18.3.0",
"@vitejs/plugin-react": "^4.3.1",
"eslint": "^8.57.0",
"eslint-plugin-react": "^7.34.2",
"eslint-plugin-react-hooks": "^4.6.2",
"eslint-plugin-react-refresh": "^0.4.7",
"sass": "^1.77.6",
"vite": "^5.3.1"
"react-hot-toast": "^2.4.1",
