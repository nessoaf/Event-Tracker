const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    eventId: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    email: [{
        type: String,
    }],
}, {
    timestamps: true
});


module.exports = Favorite = mongoose.model('Favorite', FavoriteSchema);