import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContextProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import ProfilePosts from './pages/ProfilePosts';
import Favourites from './pages/Favourites';

function App() {
  return (
    <div className="App">
      {/* <h1>App funcionando...</h1> */}
      <div>
      </div>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} >
            <Route path='posts' element={<ProfilePosts />} />
            <Route path='favourites' element={<Favourites />} />
          </Route>
          

          {/* tiene que cambiar con el id del usuario... :id... o token??? */}
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
