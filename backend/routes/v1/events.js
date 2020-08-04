require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const gravatar = require('gravatar')
const db = require('../../models')

router.get('/', (req, res) => {
    db.Event.find()
    .then(events => {
        res.send(events)
    })
    .catch(err => { console.log('routes/v1/events.js Something went wrong') })
})

router.get('/view/:id', (req, res) => {
    db.Event.findById(req.params.id)
        .then((event) => {
            res.send(event)
        })
        .catch(err => console.log('error in events.js'))
})

router.post('/addEvent', (req,res) => {
    db.Event.findOne({title: req.body.title})
    .then(event => {
        if (event) {
            return res.send('error, event already exists')
        } else {
            let reqBody = req.body
            const newEvent = new Event(
                reqBody
            )
            newEvent.save()
            .then(event => res.json(event))
        }
    })
    .catch (err => console.log(err))
})

router.put('/updateEventByTitle/:title', (req,res) => {
    db.Favorite.findOneAndUpdate(
        {title: req.params.title},
        {$set:req.body}
    )
    .then(updatedEvent => {
        res.send(updatedFavorite)
    })
    .catch(err => console.error(err))
})

router.delete('/deleteEventById/:id', (req, res) => {
    db.Event.findOneAndDelete(
        { _id: req.params.id }
        )
        .then(deleteEvent => {
        res.send({ Message: 'Event Deleted' })
    })
    .catch(err => { console.error(err) })
})

module.exports = router