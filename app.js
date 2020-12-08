const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const route = require('./routes/veganRoutes');
const bodyParser = require('body-parser');

const app = express();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDbName = process.env.MONGO_DB_NAME;

const dbURi = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.xwfkn.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`;

//middleware
app.use(express.static('public'));
app.use(bodyParser.json())
app.use('/api', route);

mongoose.connect(dbURi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(response => app.listen(3000))
        .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.redirect('/api/places')
})

