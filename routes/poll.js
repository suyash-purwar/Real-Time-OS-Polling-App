const express = require('express');
const Pusher = require('pusher');

const router = express.Router();

var pusher = new Pusher({
    appId: '489907',
    key: '52477b0c09ca20a90228',
    secret: '41da03e4f52be6e006b2',
    cluster: 'ap2',
    encrypted: true
});

router.get('/', (req, res) => {
    res.send('Polling json data');
});

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });

    return res.json({success: true, message: 'Thank you for voting'});
})

module.exports = router;