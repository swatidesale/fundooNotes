const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config('./env');

const users = require('./server/routes/api/users');
const notes = require('./server/routes/api/notes');
const labels = require('./server/routes/api/labels');
const images = require('./server/routes/api/images');

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./server/config/database').mongoURI;

//Connect to mongo
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongooDB Connected...."))
    .catch(err => console.log(err));

//Use Routes
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users',users);
app.use('/api/notes',notes);
app.use('/api/labels',labels);
app.use('/api/images',images);
app.use(express.static('./images'));

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server Started on port ${port}`));





