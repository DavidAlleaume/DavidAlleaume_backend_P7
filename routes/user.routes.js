// création d'un routeur Express
const express = require('express')
const router = express.Router()

// import du middleware d'authentification
const auth = require('../middlewares/auth/auth')

// import de la logique métier
const userCtrl = require('../controllers/user.Ctrl')

// configuration des routes
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/:id', auth, userCtrl.getUserProfile)
router.put('/:id', auth, userCtrl.updateUserProfile)


// export du routeur
module.exports = router