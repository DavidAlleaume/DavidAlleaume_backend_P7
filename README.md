Pour utiliser cette API :

- installez node JS

- depuis votre terminal en tant qu'administrateur:

    *installez sequelize-cli avec la commande : npm install -g sequelize-cli

- depuis le dossier racine du projet (backend_p7), ouvrez un terminal et :
    
    *installez sequelize avec la commande: npm install sequelize --save
    *installez les dépendances  (nodemon, express, dotenv, mysql2, bcrypt, jsonwebtoken) avec la commande npm install
    *lancez le serveur avec la commande : npm start

- Dans le dossier config, renseignez l'objet du fichier config.json avec les valeurs de votre choix en vous référant au fichier .env.exemple situé à la racine du projet

- téléchargez et installer wampserver sur votre ordinateur
- Paramétrez et lancez phpMyAdmin

- depuis le dossier racine du projet, ouvrez un terminal et créez votre base de données avec la commande: sequelize db:create
- puis effectuez les migrations des modèles avec la commande: sequelize db:migrate
(vous pouvez supprimez la base de données avec la commande: sequelize db:drop)

- Créez un fichier .env à la racine du projet et ajoutez-y : 
    TOKEN_KEY = dgksbeib456jkrblz4fhco
    (la valeur donnée ici à TOKEN_KEY est un exemple, vous pouvez lui attribuer la valeur de votre choix)
    Ajoutez-y également le dossier config (qui contient les infos d'accès à la base de données) 

- Enfin placez le fichier .env que vous venez de créer dans dans le fichier .gitignore car il contient des informations sensibles   
    
    