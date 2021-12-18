const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Veuillez fournir un token d'anthentification !`})
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        req.token = jwt.verify(token, process.env.TOKEN_KEY)
        next()
    } catch {
        res.status(401).json({ message: `Token d'authentification invalide !`})
    }
}