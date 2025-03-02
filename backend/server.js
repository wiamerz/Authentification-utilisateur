require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/login';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Stop the server if DB connection fails
  });

// Routes
app.use('/api/auth', authRoutes);

// 404 Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});









// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // Connexion à MongoDB
// const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/login';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1); // Stop le serveur si la DB ne se connecte pas
//   });

// // Routes
// app.use('/api/auth', authRoutes);

// // Gestion des erreurs 404
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Lancement du serveur
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });










// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const authRoutes = require('./routes/authRoutes'); 

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // Connexion MongoDB
// // mongoose.connect('mongodb://127.0.0.1:27017/stock')
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch(err => console.error('MongoDB connection error:', err));

// // // Routes
// // app.use('/api/auth', authRoutes); 

// // const PORT = 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
