
const bcrypt = require('bcrypt')
const models = require('../models')

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
