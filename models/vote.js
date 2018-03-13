const mongoose = require('mongoose');

const votingSchema = mongoose.Schema({
    os: {
        type: String,
        required: true
    },

    points: {
        type: String,
        required: true
    }
});

// Create collection and add schema

const Vote = mongoose.model('votes', votingSchema);
module.exports = Vote;