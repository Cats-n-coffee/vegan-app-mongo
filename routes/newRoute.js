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
    else if (req.query.zipcode) {
        collection.find({ "location.zip_code": req.query.zipcode })
        .toArray()
        .then(result => {
            console.log(result.length)
            res.send(result)
        })
        .catch(err => console.log(err))
        }
})

module.exports = router;