const express = require('express');
const Pusher = require('pusher');
const mongoose = require('mongoose');

const Vote = require('./../models/vote');

const router = express.Router();

var pusher = new Pusher({
    appId: '489907',
    key: '52477b0c09ca20a90228',
    secret: '41da03e4f52be6e006b2',
    cluster: 'ap2',
    encrypted: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true, votes: votes}));
});

router.post('/', (req, res) => {

    const vote = new Vote({
        points: 1,
        os: req.body.os
    })
    
    vote.save().then((vote) => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });

        return res.json({success: true, message: 'Thank you for voting'});
    }, (e) => {
        console.log(e);
    });

    
});

module.exports = router;