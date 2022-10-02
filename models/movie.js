const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqURL = { type: String, required: true, validate: [isURL] };

const movieSchema = new mongoose.Schema({
  movieId: reqNumber,
  nameRU: reqString,
  nameEN: reqString,
  country: reqString,
  director: reqString,
  duration: reqNumber,
  year: reqString,
  description: reqString,
  image: reqURL,
  trailerLink: reqURL,
  thumbnail: reqURL,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
