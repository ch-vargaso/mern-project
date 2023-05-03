import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthContext, { AuthContextProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';

function App() {
  // const { user } = useContext(AuthContext);
  return (
    <div className="App">
      {/* <h1>App funcionando...</h1> */}
      <div>
      </div>
      <AuthContextProvider>
        {/* <div>{user ? <p>user logged in</p> : <p>user logged out</p> }</div> */}
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} /> 
          {/* tiene que cambiar con el id del usuario... :id... */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;

//  hier there is no security and nothing body, anything to send...
// queda pendiente para seguir trabajando... porqué no me crea un map....
