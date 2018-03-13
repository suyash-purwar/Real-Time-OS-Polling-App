const mongoose = require('mongoose');

// Map golbal promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/PusherPoll')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((e) => {
        console.log(e);
    })



module.exports = mongoose;