// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = require('../middlewares/auth/private_key')
const models = require('../models')

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
                            bio: req.body.bio,
                            isAdmin: 0
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
        .catch(() => {
            return res.status(500).json({ 'error': `Impossible d'accéder à votre demande, veuillez rééssayer dans quelques instants`})
        })
}

// Connexion d'un utilisteur
exports.login = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email } })
        .then((userFound) => {
            if (!userFound) {
                return res.status(401).json({
                message: "Cet utilisateur n'existe pas",
                })
            }
            bcrypt.compare(req.body.password, userFound.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                        message: "Mot de passe incorrect",
                        })
                    }
                    res.status(200).json({
                        userId: userFound.id,
                        token: jwt.sign(
                            { userId: userFound.id }, 
                            secret_key, 
                            { expiresIn: "1h" }
                        )
                    })
                })
                .catch((err) => res.status(500).json({ err }));
        })
        .catch((err) => res.status(500).json({ err }));
}

// Récupération d'un profil utilisateur
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id
    models.User.findByPk(id)
        .then((userFound) => {
            if (!userFound) {
                return res.status(404).json({
                message: "Cet utilisateur n'éxiste pas !",
            })
        }
        res.status(200).json({
            email: userFound.email,
            firstname: userFound.firstname,
            lastname: userFound.lastname,
            bio: userFound.bio,
            isAdmin: userFound.isAdmin
            })
        })
        .catch((err) => res.status(500).json({ err }));
}

// Modification d'un profil utilisateur
exports.updateUserProfile = (req, res, next) => {
    const userOject = { ...req.body }
    models.User.findOne({ where: { id: req.params.id } })
        .then((userFound) => {
            if (!userFound) {
                return res.status(401).json({
                message: "Cet utilisateur n'existe pas",
                })
            }
            models.User.update({...userOject}, {
                where: { id: req.params.id }
            })
            .then(() => res.status(200).json({message: "Profil modifié !"}))
        })
        .catch(error => res.status(401).json({message: 'Modification non autorisée !'}))
} 
