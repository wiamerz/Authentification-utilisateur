const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Inscription
const register = async (req, res) => {
  try {
    const { username, email, password, confirmpassword, number } = req.body;

    // Validation des champs
    if (!username || !email || !password || !confirmpassword || !number) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Création de l'utilisateur
    const user = new User({ username, email, password, number });
    await user.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard' });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Générer le JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard' });
  }
};

module.exports = { register, login };
