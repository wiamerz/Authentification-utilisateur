import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: ''
  }); 

  const [errors, setErrors] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    general: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation du formulaire
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '', number: '', general: '' };
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!formData.username.trim()) {
      newErrors.username = 'Ce champ est obligatoire';
      isValid = false;
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Ce champ est obligatoire';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Ce champ est obligatoire';
      isValid = false;
    } else if (!phoneRegex.test(formData.number)) {
      newErrors.number = 'Numéro de téléphone invalide';
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); 
  //   if (validateForm()) {
  //     setLoading(true);
  //     try {
  //       setSuccessMessage('Inscription réussie! Redirection vers la page de connexion...');

  //       const response = await fetch(`http://127.0.0.1:5000/api/auth/register`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(formData),
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         setTimeout(() => {
  //           window.location.href = '/login';
  //         }, 2000);
  //       } else {
  //         setErrors({ ...errors, general: data.message || 'Une erreur est survenue' });
  //       }
  //     } catch (error) {
  //       setErrors({ ...errors, general: 'Erreur réseau, veuillez réessayer' });
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Clear previous success and error messages
  setSuccessMessage('');
  setErrors({ ...errors, general: '' });

  if (validateForm()) {
    setLoading(true);
    try {
      setSuccessMessage('Inscription réussie! Redirection vers la page de connexion...');

      // Sending data to the backend API using Axios
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is successful
      if (response.status === 200) {
        setTimeout(() => {
          window.location.href = '/login';  // Redirect to login page
        }, 2000);
      } else {
        setErrors({ ...errors, general: response.data.message || 'Une erreur est survenue' });
      }
    } catch (error) {
      setErrors({ ...errors, general: 'Erreur réseau, veuillez réessayer' });
    } finally {
      setLoading(false);
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Register</h2>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4"> 
          <div>
            <label className="block text-black mb-1 font-medium">Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.username ? 'border-red-500' : 'border-black'} rounded-lg text-black bg-white`}
              required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block mb-1 text-black font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-black'} rounded-lg text-black bg-white`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-black font-medium">Phone Number</label>
            <input 
              type="text" 
              name="number" 
              value={formData.number} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.number ? 'border-red-500' : 'border-black'} rounded-lg text-black bg-white`}
              required
            />
            {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
          </div>

          <div>
            <label className="block mb-1 text-black font-medium">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-black'} rounded-lg text-black bg-white`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block mb-1 text-black font-medium">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-black'} rounded-lg text-black bg-white`}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button 
            type="submit" 
            className={`w-full text-white p-2 rounded-lg ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={loading}
          >
            {loading ? 'Inscription...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
        <p className="text-center mt-2">
          <a href="/" className="text-blue-600">Home</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
