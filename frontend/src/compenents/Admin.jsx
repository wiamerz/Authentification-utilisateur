import React from 'react';
import Users from './compenents/Users';

const Admin = () => {
  return (
    <section>
      <h1>Admin</h1>
      <br/>
       <Users/>
      <br/>
      <div className='flexGrow'>
        <link to="/">Home</link>
      </div>
    </section>
  )
}

export default Admin