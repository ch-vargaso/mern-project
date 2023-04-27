import React, { useEffect, useState } from 'react';
// import {Route, Routes} from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';

interface User{
  email: String,
  username: String,
  password: String
} 
type Users = User[]

function App() {
  const [users, setUsers] = useState <null | Users> ([]);
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/all');
      const result = await response.json();
      setUsers(result)
      console.log("all users:", result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>App funcionando...</h1>
      <div>
      {/* {users && users.map((user, i) => {
        return <p key={i}>
          {user.username}</p>
      })} */}
      
      </div>
    </div>
  // <>
  //     <Routes> 
  //       <Route path='/' element={<Home/>} />
  //     </Routes>
  //   </>
    
  );
}

export default App;

//  hier there is no security and nothing body, anything to send...
// queda pendiente para seguir trabajando... porqué no me crea un map....
