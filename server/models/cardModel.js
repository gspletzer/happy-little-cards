const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//card schema

let cardSchema = new Schema({
  title: {type: String, required: true},
  image: {type: String, required: true},
  count: {type: Number, required: true},
  keywords: {type: Array, required: true},
});

module.exports = mongoose.model('cards', cardSchema);