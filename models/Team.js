const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: String,
  abbreviation: String
});

module.exports = mongoose.model('Team', teamSchema);