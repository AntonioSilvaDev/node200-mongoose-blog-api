const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/my-blog', { useNewUrlParser: true });
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