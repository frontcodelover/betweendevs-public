const Technology = require('../models/technology');

const getAllTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find({});

    if (!technologies || technologies.length === 0) {
      console.log('Aucune technologie trouvée');
    }

    res.json(technologies);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTechnologies,
};
