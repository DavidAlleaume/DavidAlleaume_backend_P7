// création d'un routeur Express
const express = require('express')
const router = express.Router()

// import du middleware d'authentification
const auth = require('../middlewares/auth')

// import de multer pour la gestion des images
const multer = require('../middlewares/multer-config')

// import de la logique métier
const postCtrl = require('../controllers/post.Ctrl')


// Initialisation des routes
router.post('/', auth, multer, postCtrl.createPost)
router.get('/', auth, postCtrl.getAllPosts)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)

// export du routeur
module.exports = router