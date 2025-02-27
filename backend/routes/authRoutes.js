const express = require('express');
const router = express.Router();
const { register, login } = require('../Controllers/authController');

// Assure-toi que les routes utilisent les bonnes méthodes (POST pour register/login)
router.post('/register', register);
router.post('/login', login);

module.exports = router; // <- C'est ici que l'export doit être bien fait
