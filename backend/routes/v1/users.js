require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const bcrypt = require('bcryptjs')
const router = express.Router()
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const db = require('../../models')
const User = require('../../models/user')
const { response } = require('express')

//some headers for debugging
app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

//dev route for testing, please do not delete
router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.send(users)
        })
})

//dev route for testing, please do not delete
router.get('/view/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            res.send(user)
        })
})

router.put('/updateByZipcode/:id/:zipcode', (req, res) => {

    db.User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { zipcode: req.params.zipcode } }
    )
        .then(updatedUser => {
            res.send(updatedUser)
        })
        .catch(err => console.error(err))
})


router.get('/test2', (req, res) => {
    axios.get(`https://api.eventful.com/json/events/search?app_key=NFRS6FwLVhcNKTWD&keywords=concerts&location=Seattle&date=Future`)
        .then(resJSON => {
            console.log(resJSON)
            res.send(resJSON)
        })
        .catch(err => res.send(err))
})

// Register
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return console.log(user.email + ': Email already exists')
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                const newUser = new User(
                    req.body
                )
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err
                        }
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
        .catch(err => res.json(err))
})
//delete .json(user) for long term security



// Login
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ email: 'user not found' })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name, email: user.email, zipcode: user.zipcode, createdAt: user.createdAt, favorite: user.favorite }
                        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                            res.json({ success: true, token: 'Bearer ' + token })
                        })
                    } else {
                        return res.status(400).json({ password: 'Password is incorrect' })
                    }
                })
        })
        .catch(err => res.json(err))
})

module.exports = router