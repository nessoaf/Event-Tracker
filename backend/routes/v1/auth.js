require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const gravatar = require('gravatar')

//load Models
const db = require('../../models')

//shows all documents in collection 'users'
router.get('/', (req, res) => {
    db.User.find()
        .then(users => {
            res.send(users)
        })
        .catch(err => console.log(err))
})

//find a user by email (unique according to Schema rules)
router.get('/findUserByEmail/:email', (req, res) => {
    db.User.find({ email: req.params.email })
        .then(user => {
            console.log(user)
        })
        .catch(err => console.log(err))
})

//Modified from AZocher's Mern-Auth codealong
// GET api/users/register (Public)
router.post('/addUser', (req, res) => {
    db.User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm',
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    DOB: req.body.DOB,
                    zipcode: req.body.zipcode,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

//updates a user, email is unique, 
//TODO 0 passing {$set: reqBody} would be preferred to {name:req.body.name, ...}
router.put('/updateUserByEmail/:email', (req, res) => {
    db.User.findOneAndUpdate(
        { email: req.body.email },
        { name: req.body.name, email: req.body.email, password: req.body.password, DOB: req.body.DOB, zipcode: req.body.zipcode }
    )
        .then(updatedUser => {
            res.send(updatedUser)
        })
        .catch(err => console.log(err))
})

//deletes user, no body argument is sent.
router.delete('/deleteUserByEmail/:email', (req, res) => {
    db.User.findOneAndDelete({ email: req.params.email })
        .then(deletedItem => {
            res.send({ message: 'Successfully destroyed' })
        })
        .catch(err => console.log(err))
})

module.exports = router