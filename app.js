const express = require('express');
const mongoDb = require('mongodb');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config();
const route = require('./routes/newRoute');
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');

const app = express();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDbName = process.env.MONGO_DB_NAME;
const PORT = process.env.PORT || 3000;

const dbURi = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.xwfkn.mongodb.net`;///${mongoDbName}?retryWrites=true&w=majority`;

//middleware
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', route);

const client = new MongoClient(dbURi, { useUnifiedTopology: true });

async function connectToDb() {
    await client.connect().then(async(result) => {
        app.listen(PORT);
        const database = client.db(mongoDbName);
        const collection = database.collection('users');
        
        app.locals.collection = collection;
        console.log('connected')

// The commented code below adds a field to each document in the database. Only need to run this if 
// new documents are added in the database

        // var bulkOp = collection.initializeOrderedBulkOp();
        // var count= 0;

        // collection.find({  }, { projection: { coordinates: 1 } }).forEach(result => {
        //     //const findCoords = await collection.findOne({  }, { projection: { coordinates: 1 } });
        //     //const printCoords = findCoords.toArray();

        //     const foundLat = result.coordinates["latitude"];
        //     const foundLng = result.coordinates["longitude"];
        //     console.log('found ', foundLat, foundLng )

        //     bulkOp.find({ "_id": result._id }).updateOne({
        //         "$set": {
        //             "loc": {
        //                 "type": "Point",
        //                 "coordinates": [foundLng, foundLat]
        //             }
        //         },
        //     });
        //     count ++;
        //     if(count % 100 === 0) {
        //         bulkOp.execute();
        //         bulkOp = collection.initializeOrderedBulkOp();
        //     }
        // });
        // if (count > 0) {
        //     bulkOp.execute();
        // }

        
    }, error => {
        console.error(error)
    })
    .catch(err => console.log(err))
}

connectToDb()

app.get('/', (req, res) => {
    res.redirect('/api/places')
})

