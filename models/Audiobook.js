const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

const AudiobookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  reviews: [ReviewSchema]
});

module.exports = mongoose.model('Audiobook', AudiobookSchema);