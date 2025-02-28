import React, { useState } from 'react';


function Register() {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    number: ''
  }); 

  // validation errors state
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    number: ''
  });

  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {  username: '', email: '',  password: '', confirmpassword: '',  number: '' };
    
    // Check each field
    if (!formData.title.trim()) {
      newErrors.username = 'Ce champ est obligatoire';
      isValid = false;
    }
    
    if (!formData.price) {
      newErrors.email = 'Ce champ est obligatoire';
      isValid = false;
    }
    
    if (!formData.stock) {
      newErrors.password = 'Ce champ est obligatoire';
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.confirmpassword= 'Ce champ est obligatoire';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.number= 'Ce champ est obligatoire';
      isValid = false;
    }
    
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validateForm()){
      console.log('Form Data:', formData)
      //ajouter l'appel à l'API pour l'inscription
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Register</h2>
         <form  onSubmit={handleSubmit} className="space-y-4"> 
          <div>
            <label className="block  text-black mb-1 font-medium">Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              className={`w-full p-2 border  ${errors.username ? 'border-red-500' : 'border-black'} rounded-lg`}
              required
            />
             {errors.title && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={`w-full p-2 border  ${errors.email ? 'border-red-500' : 'border-black'} rounded-lg`}
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
              className={`w-full p-2 border  ${errors.number ? 'border-red-500' : 'border-black'} rounded-lg`}
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
              className={`w-full p-2 border  ${errors.password ? 'border-red-500' : 'border-black'} rounded-lg`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black font-medium">confirm Password</label>
            <input 
              type="confirm password" 
              name="confirm password" 
              value={formData.confirmpassword} 
              onChange={handleChange} 
              className={`w-full p-2 border  ${errors.confirmpassword ? 'border-red-500' : 'border-black'} rounded-lg`}
              required
            />
            {errors.confirmpassword && <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>}
          </div>
          <button type="submit" className="w-fulltext-black  bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-black text-blue-600">Login</a>
          <a href="/" className="text-black text-blue-600">Home</a>
        </p>
        
         
      
      </div>
    </div>
  );
}

export default Register;