Pour utiliser cette API :

- installez node JS

- depuis votre terminal en tant qu'administrateur:

    *installez sequelize-cli avec la commande : npm install -g sequelize-cli

- depuis le dossier racine du projet (backend_p7), ouvrez un terminal et :
    
    *installez sequelize avec la commande: npm install sequelize --save
    *installez les dépendances  (nodemon, express, dotenv, mysql2, bcrypt, jsonwebtoken) avec la commande npm install
    *lancez le serveur avec la commande : npm start

- renseignez les champs de l'objet du fichier config.json dans le dossier config avec les valeurs de votre choix

- téléchargez et installer wampserver sur votre ordinateur
- Paramétrez et lancez phpMyAdmin

- depuis le dossier racine du projet créez votre base de données avec la commande: sequelize db:create
- puis effectuez les migrations des modèles avec la commande: sequelize db:migrate
(vous pouvez supprimez la base de données avec la commande: sequelize db:drop)

- Créez un fichier .env à la racine du projet et ajoutez-y : 
    TOKEN_KEY = dgksbeib456jkrblz4fhco   
    
    (la valeur donnée ici à TOKEN_KEY est un exemple, vous pouvez lui attribuer la valeur de votre choix)