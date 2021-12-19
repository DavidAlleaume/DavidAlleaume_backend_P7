const jwt = require('jsonwebtoken')
const models = require('../models')
require('dotenv').config()

// Création d'un post
exports.createPost = (req, res, next) => {
    const newPost = {
        content: req.body.content,
        UserId: req.token.userId
      }

      if (req.file) {
        newPost.attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      }
    
    models.Post.create(newPost)
    .then(() => res.status(201).json({ message: `Le post de l'utilisateur n°${newPost.UserId} a bien été publié !`}))
    .catch(error => {
        res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
    })
}

// Récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            { 
                model: models.User,
                attributes: [ 'firstname', 'lastname']
            }
        ]
        }).then(function(posts) {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ "error": "Aucun post n'a été trouvé" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
        })
}

// Modification d'un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body),
        attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body}
    models.Post.findOne({where: { id: req.params.id}})
        .then(postFound => {
            if(!postFound){
                return res.status(404).json({ message: `Ce post n'existe pas !` })
            } else if (req.token.userId !== postFound.UserId) {
                return res.status(401).json({ message: "Requête non autorisée !" }) 
            }
            models.Post.update({...postObject}, {
                where: { id: req.params.id }
            })
            .then(() => res.status(200).json({message: `Le post n°${postFound.id} de l'utilisateur n°${req.token.userId} a bien été modifié !`, data: postObject}))
        })
        .catch(error => {
            res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
        })
    
}

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    models.Post.findOne({where: { id: req.params.id}})
    .then(postFound => {
        if(!postFound){
            return res.status(404).json({ message: `Ce post n'existe pas !` })
        } else if (req.token.userId !== postFound.UserId) {
            return res.status(401).json({ message: "Requête non autorisée !" }) 
        }
        models.Post.destroy({
            where: { id: req.params.id }
        })
        .then(() => res.status(200).json({ message: `Le post n°${postFound.id} a bien été supprimé !` }))
    })
    .catch(error => {
        res.status(500).json({ message: `Impossible d'accéder à votre demande ! Veuillez rééssayer dans quelques instants.`, data: error})
    })
}