const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Authentication routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controllers/authController');

// // Routes d'authentification
// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;
