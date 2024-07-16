# Projet Demo Flutilliant - Front

## Démarche

Le projet étant un test technique; j'ai utilisé plusieurs approches pour des problématiques
similaires. Pour accéder à certaines données de l'API j'ai notamment utilisé
React-router-dom sur les pages lorsque la données devait être immediatement accessible.

J ai également utilisé useEffect lorsqu une mise à jour du rendu etait
nécessaire. Bien entendu, il s'agit d'un exercice qui nuit à la cohérence du code mais qui
permet d exposer la maniere de coder diverses technologies.

Concernant le style, j'ai utilisé SASS à 3 niveaux : d'une part pour fabriquer un systeme de coloration
des inputs et boutons par simple nommage de class (à la maniere de Tailwind), pour
l'indentation ainsi que pour la définition des variables css.

Coté Backend, MongoDB est exploité en server local (car je craignais de ne pas avoir
internet ce weekend) mais il est transposable à Atlas sans difficulté.
Le peuplement de la base de données se fait a l'aide d'un script node seed.js à
executer direcement dans le dossier avant de lancer l'application.

## Packages utilisés

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
