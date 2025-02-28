const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email est requis'],
    trim: true,
    unique: true,
  },
  password: {  
    type: Number,  
    required: [true, 'email est requis'],
  },
  confirmpassword: {  
    type: Number,  
    required: [true, 'email est requis'],
  },

  number: {
    type: Number,  
    required: [true, 'phone number est requis'],
  },
});

module.exports = mongoose.model('User', userSchema);
