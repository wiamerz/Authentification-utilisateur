import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div> 
     <div className='text-center font-bold text-pretty text-black text-3xl flex items-center justify-center'>
      welcome to the Home Page
     </div>
    
    <div className='h-screen flex items-center justify-center '>
      <Link to="/Login" className="w-fulltext-white  bg-white-600 text-white p-2 rounded-lg hover:bg-black">
          <span> Login</span>
        </Link>
        <Link to="/Register" className="w-fulltext-white  bg-white-600 text-white p-2 rounded-lg hover:bg-black">
          <span>Register</span>
        </Link>

      
    
    </div>
    </div>
  )
}

export default Home