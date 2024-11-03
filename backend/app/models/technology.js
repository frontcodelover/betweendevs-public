const mongoose = require('../database');

// Correction du schéma
const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { 
  collection: 'technology' // Spécifier explicitement le nom de la collection
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;