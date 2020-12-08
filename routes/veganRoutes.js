const express = require('express');
const router = express.Router();
const Vegan = require('../models/VeganSchema');


router.get('/places', (req, res, next) => {
    if (req.query.city) {
        Vegan.find({ "location.city": req.query.city })
         .then(result => {
             console.log(result.length);
             res.send(result)
            })
         .catch(err => console.log(err))
    }
    else if (req.query.zipcode) {
        Vegan.find({ "location.zip_code": req.query.zipcode })
        .then(result => {
            console.log(result.length)
            res.send(result)
        })
        .catch(err => console.log(err))
    }
})

module.exports = router;