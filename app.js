const express = require('express');
const mongoDb = require('mongodb');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config();
const route = require('./routes/newRoute');
//const bodyParser = require('body-parser');

const app = express();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDbName = process.env.MONGO_DB_NAME;

const dbURi = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.xwfkn.mongodb.net`;///${mongoDbName}?retryWrites=true&w=majority`;

//middleware
app.use(express.static('public'));
//app.use(bodyParser.json())
app.use('/api', route);

const client = new MongoClient(dbURi, { useUnifiedTopology: true });

async function connectToDb() {
    await client.connect().then(result => {
        app.listen(3000);
        const database = client.db(mongoDbName);
        const collection = database.collection('users');
        
        app.locals.collection = collection;
        console.log('connected', result)
    }, error => {
        console.error(error)
    })
    .catch(err => console.log(err))
}

connectToDb()

app.get('/', (req, res) => {
    res.redirect('/api/places')
})

