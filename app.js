const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const poll = require('./routes/poll');
const db = require('./config/database');

const app = express();

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Enable CORS
app.use(cors());
// Setup port
const port = process.env.PORT || 3000;

// Routes
app.use('/poll', poll);

// Start server
app.listen(port, () => {
    console.log(`Server is started up on port ${port}`);
});
