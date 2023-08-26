const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: String,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }
});

module.exports = mongoose.model('Player', playerSchema);