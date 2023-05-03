import React, { useContext } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';

function NavBar({ }) {
    const { user, login, logout } = useContext(AuthContext);
    const location = useLocation();
    // const {user, logOut} = useContext(AuthContext)
    // la necesito después para hacer logging y eso...
    return (
        <div>
            {/* Esto tengo que corregirlo!!!!! */}
            <div>{user ? <p>user logged in</p> : <p>user logged out</p>}</div>
            <div>{user ? <button onClick={logout}>Log out</button> : <Link to='/login'>Login</Link>}</div>
            {/* Tengo que borrar después el link de react - dom de impoort cuando lo corriga... */}

            <nav className='navbar_container'>
                <div className='first_group' >
                    <NavLink to={'/'} className={({isActive})=> isActive ?'active_page': 'nav_link'} >Home</NavLink>
                    <NavLink to={'profile'} className={({isActive})=> isActive ?'active_page': 'nav_link'}>Profile</NavLink>
                    <NavLink to={'register'} className={({isActive})=> isActive ?'active_page': 'nav_link'}>Register</NavLink>
                </div>
                <div>
                    <NavLink to={'login'} className={({isActive})=> isActive ?'active_page': 'nav_link'}>Login</NavLink>
                </div>
            </nav>
        </div>
    );
}

export default NavBar

//  tsrafc para iniciar una pagina con TypeScript...

