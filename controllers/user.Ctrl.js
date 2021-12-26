// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')
require('dotenv').config()

// Création d'un utilisteur
exports.signup = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email }})
        .then(userFound => {
            if (!userFound) {
                bcrypt.hash(req.body.password, 5)
                    .then((hash) => {
                        const user = {
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: hash,
                            isAdmin: 0,
                        }
                        models.User.create(user)
                        .then(() => {
                            res.status(201).json({ message: `L'utilisateur ${user.firstname} ${user.lastname} a bien été créé !`})
                        })  
                    })
            } else {
            return res.status(409).json({ 'error': `Cet utilisteur existe déjà !`})
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
        })
}

// Connexion d'un utilisteur
exports.login = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email } })
        .then((userFound) => {
            if (!userFound) {
                return res.status(404).json({
                message: "Cet utilisateur n'existe pas !",
                })
            }
            bcrypt.compare(req.body.password, userFound.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                        message: "Mot de passe incorrect !",
                        })
                    }
                    res.status(200).json({
                        message: `Vous êtes maintenant connecté !`,
                        userId: userFound.id,
                        token: jwt.sign(
                            { userId: userFound.id }, 
                            process.env.TOKEN_KEY, 
                            { expiresIn: "3h" }
                        )
                    })
                })
                .catch((err) => res.status(500).json({ err }));
        })
        .catch(error => {
            res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
        })
}

// Récupération d'un profil utilisateur
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id
    models.User.findByPk(id)
        .then((userFound) => {
            if (!userFound) {
                return res.status(404).json({
                message: "Cet utilisateur n'existe pas !",
            })
        } 
        res.status(200).json({
            userId: userFound.id,
            email: userFound.email,
            firstname: userFound.firstname,
            lastname: userFound.lastname,
            isAdmin: userFound.isAdmin,
            profileAvatar: userFound.profileAvatar,
            bio: userFound.bio,
            })
        })
        .catch(error => {
            res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
        })
}

// Modification d'un profil utilisateur
exports.updateUserProfile = (req, res, next) => {
    const userProfile = req.file ?
    {
        ...JSON.parse(req.body),
        profileAvatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body}
    models.User.findOne({where: { id: req.params.id}})
        .then(userFound => {
            if(!userFound){
                return res.status(404).json({ message: `Cet utilisateur n'existe pas !` })
            } else if (req.token.userId !== userFound.id) {
                return res.status(401).json({ message: "Requête non autorisée !" }) 
            }
            models.User.update({...userProfile}, {
                where: { id: req.params.id }
            })
            .then(() => res.status(200).json({message: "Votre profil a bien été modifié !", data: userProfile}))
        })
        .catch(error => {
            res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
        })
}

// Suppression d'un utilisateur
exports.deleteUserProfile = (req, res, next) => {
    models.User.findOne({
          where: { id: req.params.id },
        })
        .then((userFound) => {
            if (!userFound) {
                return res.status(404).json({ message: "Cet utilisateur n'existe pas !" })
            } else if (req.token.userId !== userFound.id) {
                return res.status(401).json({ message: "Requête non autorisée !" }) 
            }
            models.Post.destroy({
                where: { UserId: userFound.id }
            })
            .then(() => {
                models.User.destroy({
                    where: { id: req.params.id }
                })
                    return res.status(200).json({message: "Le profil a bien été supprimé !"})    
            })
        })    
        .catch(error => {
            res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
        })               
}        


