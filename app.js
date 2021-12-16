const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => { res.status(200).send('Bonjour et bienvenue sur mon serveur !')})

const userRoutes = require('./routes/user.routes')
//const messageRoutes = require('./routes/message.routes')

app
    .use('/api/user', userRoutes)
    //.use('/api/message', messageRoutes)


module.exports = app