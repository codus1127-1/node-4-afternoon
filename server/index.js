require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middleware/checkForSession')
const {SERVER_PORT, SESSION_SECRET} = process.env
const ctrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', ctrl.read)
app.get('/api/user', authCtrl.getUser)
app.get('/api/search', searchCtrl.search)

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/logout', authCtrl.signout)
app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)

app.delete('/api/cart/:id', cartCtrl.delete)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))