const mongoose = require('mongoose');

var trailSchema = new mongoose.Schema({
  trailName: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  difficulty: { type: String },
  hikeDistance: { type: Number },
  elevGain: { type: Number },
  comment: { type: String }
});

module.exports = mongoose.model('Trail', trailSchema);
