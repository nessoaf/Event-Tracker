require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')
const passport = require('passport')
const bodyParser = require('body-parser')
const mdb = process.env.MONGO_URI
const users = require('./routes/v1/users')
const mongoose = require('mongoose')

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "text/javascript")
    res.header("Accept", "application/json")
    next();
  });

//Use of cors
app.use(cors())

//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//setup out routes
app.use('/v1/users', users)
app.use('/v1/users', require('./routes/v1/users'))
app.use('/v1/events', require('./routes/v1/events'))
app.use('/v1/favorites', require('./routes/v1/favorites'))

//Call passport
require('./config/passport')(passport)

// Mongoose URI
mongoose.connect(mdb)
    .then(() => { console.log('MongoDB Connected... (^///^)') })
    .catch(err => console.log(err))

//Backend Home Route
app.get('/', (req, res) => {
    res.send('Hello World \n Server in up and Running! 🐱‍🐉')
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on ${process.env.PORT || 3001}`)
})