const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const adminName = process.env.MLAB_ADMIN_NAME;
const key = process.env.MLAB_PASSWORD;

mongoose.connect(`mongodb://${adminName}:${key}@ds235418.mlab.com:35418/testapi`, { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    console.log('I am here');
    res.status(200).send('hi');
});

module.exports = app;