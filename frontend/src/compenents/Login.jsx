import React, { useState } from 'react';
import axios from 'axios';

function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Validation du formulaire
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Ce champ est obligatoire';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format invalide';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Ce champ est obligatoire';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/auth/login', formData, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.token) {
          setSuccessMessage('Login successful!');
          localStorage.setItem('token', response.data.token); // Stocker le JWT dans le localStorage
        }
      } catch (error) {
        setApiError(error.response?.data?.message || 'Erreur lors de la connexion');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">   {/* Add onSubmit handler here */}
          <div>
            <label className="block text-black mb-1 font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 border text-black border-black rounded-lg"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} {/* Display error message */}
          </div>
          <div>
            <label className="block mb-1 text-black font-medium">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-2 border border-black text-black rounded-lg"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} {/* Display error message */}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Sign In
          </button>
        </form>
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>} {/* Show success message */}
        <p className="text-center text-black mt-4">
          Don't have an account? <a href="/register" className="text-white text-blue-600">Register</a>
          <a href="/" className="text-white text-blue-600">Home</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
