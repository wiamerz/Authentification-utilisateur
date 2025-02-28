import React from 'react'

const Login = () => {
  return (                                                                                                                                                   
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-black mb-6 text-center">Login</h2>
      <form  className="space-y-4">   
        {/* onSubmit={handleSubmit} */}
        <div>
          <label className="block text-black mb-1 font-medium">Email</label>
          <input 
            type="email" 
            name="email" 
            // value={formData.email} 
            // onChange={handleChange} 
            className="w-full p-2 border border-black rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-black font-medium">Password</label>
          <input 
            type="password" 
            name="password" 
            // value={formData.password} 
            // onChange={handleChange} 
            className="w-full p-2 border border-black rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          Sign In
        </button>
      </form>
      <p className="text-center text-black mt-4">
        Don't have an account? <a href="/register" className="text-white text-blue-600">Register</a>
      
      <a href="/" className="text-white text-blue-600">Home</a>
      </p>
    </div>
  </div>
);
}

export default Login