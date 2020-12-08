const mongoose = require('mongoose');

const veganSchema = new mongoose.Schema ({});

const Vegan = mongoose.model('Vegan', veganSchema, 'users');

module.exports = Vegan;