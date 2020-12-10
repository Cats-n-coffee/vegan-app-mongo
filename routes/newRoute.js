const express = require('express');
const router = express.Router();
const mongoDb = require('mongodb');

const app = express();

router.get('/places', (req, res, next) => {
    const collection = req.app.locals.collection;

    if(req.query.city) {
        collection.find({ "location.city": req.query.city })
        .toArray()
        .then(result => {
            console.log(result.length);
            res.send(result)
        })
        .catch(err => console.log(err))
    }
    // else if (req.query.zipcode) {
    //     collection.find({ "location.zip_code": req.query.zipcode })
    //     .toArray()
    //     .then(result => {
    //         console.log(result.length)
    //         res.send(result)
    //     })
    //     .catch(err => console.log(err))
    // }
    else {
        collection.find({
            "loc": {
                "$near": {
                    "$geometry": {
                        type: "Point", coordinates: [ parseFloat(req.query.lng), parseFloat(req.query.lat) ],
                    },
                    "$maxDistance": 100000,
                    //"distanceField": "dist",
                    //"spherical": true,
                    //"query": { "geometry.type": "Point" }
                },
            }
        },
        {
            "$sort": {
                "distance": -1
            }
        }
    )
        .toArray()
        .then(result => res.send(result))
        .catch(err => console.log(err))
    }
})

module.exports = router;

// index in mongodb?
// MongoError: unknown top level operator: $near
// use .find() or use .near() or aggregate
// need the type: "point" in mongo? ---->> need to add to the coordinates field