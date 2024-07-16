## MongoDB Community

J ai utilisé MongoDB Community Server pour la mise en place de la base de donnee, mais le programme est tout a fait fonctionnel sur MongoDb Atlas.

## Variables d environnement

Seules deux variables d environnement sont utilisées :
L uri de connexion à MongoDB et le port du server express.

## Seeder

Afin de rendre l'application plus dynamique; j'ai crée un fichier seed.js
Il doit servir à peupler lq base de données.
Le seeder s appuie sur faker pour générer des personnes et rapports fictifs.

## CORS

La configuration CORS est située dans le fichier setCorsConfiguration.middleware.
Elle accepte les requetes exclusivement provenant de http://localhost:5173 pour correspondre à l'adresse par défaut sous viteJs.
