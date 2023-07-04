const mongoose = require('mongoose');

const planesSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Plane', planesSchema);
