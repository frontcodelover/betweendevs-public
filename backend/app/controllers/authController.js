const User = require('../models/user.js');
const speTechnoLookup = require('../utils/speTechnoLookup.js');
const generateJwt = require('../utils/generateJWT.js');
const checkPassword = require('../utils/checkPassword.js');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // On récupère l'utilisateur dans la base de données en utilisant l'agrégation
      const user = await User.aggregate([
        { $match: { email } },
        ...speTechnoLookup, // Ajoute les étapes de pipeline définies dans speTechnoLookup
      ]);

      // Vérifie que l'utilisateur existe
      if (!user.length || !user[0].password) {
        return res.status(401).json({ error: 'Username or password error, please try again' });
      }

      // Vérifie si le mot de passe est correct
      const isPasswordCorrect = await checkPassword(password, user[0].password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Username or password error, please try again' });
      }

      // Génère un JWT pour l'utilisateur
      const token = generateJwt(user[0]);

      // Renvoie le JWT et d'autres informations
      res.status(200).json({ 
        token, 
        userId: user[0]._id, 
        goalsSlug: user[0].goals ? user[0].goals.slug : null  // Vérifie l'existence de goals avant d'accéder à slug
      });
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      res.status(500).json({ error: 'Connexion error' });
    }
  },
};

module.exports = authController;
