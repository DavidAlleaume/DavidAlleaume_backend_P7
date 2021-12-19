const express = require('express')
const path = require("path")
const app = express()

// Middleware qui ajoute des headers à l'objet response pour éviter les problèmes de CORS
app.use((req, res, next) => {
    // on autaorise tout le monde à accéder à notre API
    res.setHeader('Access-Control-Allow-Origin', '*')
    // on autorise certains headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    // on autorise certaines methodes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
});

app.use(express.json())

app.get('/', (req, res) => { res.status(200).send('Bonjour et bienvenue sur mon serveur !')})

app.use("/images", express.static(path.join(__dirname, "images")))

const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')

app
    .use('/api/user', userRoutes)
    .use('/api/post', postRoutes)


module.exports = app