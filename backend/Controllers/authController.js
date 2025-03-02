const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register function
const register = async (req, res) => {
  console.log('Requête reçue:', req.body); // Log the request body
  try {
    const { username, email, password, confirmPassword, number } = req.body;

    // Validate required fields
    if (!username || !email || !password || !confirmPassword || !number) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Create new user
    const user = new User({ username, email, password, number });
    console.log('User object before saving:', user); // Log the user object before saving

    // Save user to database
    try {
      await user.save();
      console.log('User saved successfully'); // Log after saving
      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (saveError) {
      console.error('Error saving user:', saveError); // Log any save errors
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
  } catch (error) {
    console.error('Erreur serveur:', error); // Log any other errors
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard' });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user data
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Erreur serveur:', error); // Log any errors
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard' });
  }
};

module.exports = { register, login };

// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// // Inscription
// // const register = async (req, res) => {
// //   try {
// //     const { username, email, password, confirmpassword, number } = req.body;

// //     // Validation des champs
// //     if (!username || !email || !password || !confirmpassword || !number) {
// //       return res.status(400).json({ message: 'Tous les champs sont requis' });
// //     }

// //     if (password !== confirmpassword) {
// //       return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
// //     }

// //     // Vérifie si l'utilisateur existe déjà
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'Cet email est déjà utilisé' });
// //     }

// //     // Création de l'utilisateur
// //     const user = new User({ username, email, password, number });
// //     await user.save();

// //     res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard' });
// //   }
// // };

// const register = async (req, res) => {
//   console.log('Requête reçue:', req.body); // <-- Pour voir ce que le frontend envoie
//   try {
//     const { username, email, password, confirmpassword, number } = req.body;

//     if (!username || !email || !password || !confirmpassword || !number) {
//       return res.status(400).json({ message: 'Tous les champs sont requis' });
//     }

//     if (password !== confirmpassword) {
//       return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Cet email est déjà utilisé' });
//     }

//     const user = new User({ username, email, password, number });
//     await user.save();

//     res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
//   } catch (error) {
//     console.error('Erreur serveur:', error);
//     res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard' });
//   }
// };
// // Connexion
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email et mot de passe requis' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: 'Identifiants invalides' });
//     }

//     // Générer le JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         username: user.username
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard' });
//   }
// };



// module.exports = { register, login };
