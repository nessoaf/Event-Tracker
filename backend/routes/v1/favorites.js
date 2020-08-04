const express = require('express')
const router = express.Router()
var cors = require('cors')
var app = express()

const db = require('../../models')

app.use(cors())

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

router.get('/', function (req, res, next) {
    db.Favorite.find()
        .then(favorites => {
            console.log(favorites)
            res.send(favorites)
        })
})

router.get('/idOnly', (req, res, next) => {
    let filter = "title"
    db.Favorite.find({}, { filter })
        .then(favorites => {
            res.send(favorites)
        })
})

router.post('/testpost', function (req, res, next) {
    db.Favorite.findOneAndUpdate({
        email: req.body.email
    },
        { $push: { email: req.body.email } })
        .then(favorite => {
            if (favorite) {
                return res.send('error, event already favorited')
            } else {
                let reqBody = req.body
                const newFave = new Favorite(
                    reqBody
                )
                newFave.save()
                    .then(fave => res.json(fave))
            }
        })
        .catch(err => console.log(err))
})

router.delete('/deleteFavorite/:id', (req, res, next) => {
    db.Favorite.findOneAndDelete(
        { _id: req.params.id }
    )
        .then(deleteFavorite => {
            res.send({ Message: 'Favorite Deleted' })
        })
        .catch(err => { console.error(err) })
})

router.post('/add', function (req, res) {
    db.Favorite.create({
        eventId: req.body.eventId
    })
        .then(favorite => {
            db.User.findOneAndUpdate({
                email: req.body.email
            },
                { $push: { userEmail: favorite } }
            ).then(function (event) {
                res.send(event)
            })
        })
})


module.exports = router