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
    
    else {
        collection.find({
            "loc": {
                "$near": {
                    "$geometry": {
                        type: "Point", coordinates: [ parseFloat(req.query.lng), parseFloat(req.query.lat) ],
                    },
                    "$maxDistance": 10000,
                },
            }
        },
        {
            "$sort": {
                "distance": -1
            }
        }
    )
        .limit(20)
        .toArray()
        .then(result => res.send(result))
        .catch(err => console.log(err))
    }
})

module.exports = router;
