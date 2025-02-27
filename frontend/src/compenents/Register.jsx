import React from 'react'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Register</h2>
         <form   className="space-y-4"> {/*onSubmit={handleSubmit} */}
          <div>
            <label className="block  text-black mb-1 font-medium">Username</label>
            <input 
              type="text" 
              name="username" 
              // value={formData.username} 
              // onChange={handleChange} 
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-black font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              // value={formData.email} 
              // onChange={handleChange} 
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-black font-medium">Phone Number</label>
            <input 
              type="text" 
              name="number" 
              // value={formData.number} 
              // onChange={handleChange} 
              className="w-full p-2 border rounded-lg"
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
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button type="submit" className="w-fulltext-black  bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-black text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register