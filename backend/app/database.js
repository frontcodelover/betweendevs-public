// database.js
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@betweendevs.1emcuo1.mongodb.net/betweendevs?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));

// Ajouter un listener pour les erreurs de connexion
mongoose.connection.on('error', (err) => {
  console.error('Erreur MongoDB:', err);
});

mongoose.connection.once('open', async () => {
  console.log('Connexion MongoDB établie');
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(
      'Collections disponibles:',
      collections.map((c) => c.name),
    );
  } catch (err) {
    console.error('Erreur lors de la liste des collections:', err);
  }
});

module.exports = mongoose;
