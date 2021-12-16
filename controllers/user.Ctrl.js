
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = require('../middlewares/auth/secret_key')
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

exports.login = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email } })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({
            message: "Cet utilisateur n'existe pas",
          });
        }
        bcrypt.compare(req.body.password, userFound.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({
                message: "Mot de passe incorrect",
              });
            }
            res.status(200).json({
              userId: userFound.id,
              token: jwt.sign({ userId: userFound.id }, secret_key, { expiresIn: "1h" }),
            });
          })
          .catch((err) => res.status(500).json({ err }));
      })
      .catch((err) => res.status(500).json({ err }));
  };
