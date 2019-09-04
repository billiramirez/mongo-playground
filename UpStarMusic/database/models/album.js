// eslint-disable-next-line import/newline-after-import
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: String,
  date: Date,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  reveneu: Number
});

module.exports = AlbumSchema;
