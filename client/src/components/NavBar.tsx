import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
// useLocation, Link  Esto pertenece a 'react-router-dom'
import AuthContext from '../contexts/AuthContext';

function NavBar() {
    const { user , logout } = useContext(AuthContext);
    const location = useLocation();
    return (
        <div>
            <nav className='navbar_container'>
                <div className='navbar_1' >
                    <NavLink to={'/'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'} >
                        <div className='navbar_text_container'>
                            <p>Home</p> 
                        </div>
                    </NavLink>

                    {user ? <NavLink to={'profile'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}>
                        <div className='navbar_text_container' >
                            <p>Profile</p>
                        </div>
                    </NavLink> : null}
                    {/* {!user ? <NavLink to={'register'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}><p>Register</p></NavLink> : null} */}

                </div>
                <div className='navbar_login'>
                    {/* {user ? <p className='welcome_msg'>Welcome, {user.username}</p> : null} */}
                    {!user ? <NavLink to={'register'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}>
                        <div className='navbar_text_container' >
                            <p>Register</p>
                        </div>
                    </NavLink> : null}
                    {!user ? <NavLink to={'login'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}>
                        <div className='navbar_text_container' >
                            <p>Login</p>
                        </div>

                    </NavLink> :
                        <NavLink to={'login'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'} onClick={logout}>

                            <div className='navbar_text_container' >
                                <p>Log out</p>                                
                            </div>      
                            
                        </NavLink>}
                    
                </div>
            </nav>
        </div>
    );
}

export default NavBar

//  tsrafc para iniciar una pagina con TypeScript...

                    {/* {location.pathname.includes('profile') ?
                        <>
                            <NavLink to={'profile/posts'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}>My Posts</NavLink>
                            <NavLink to={'profile/favourites'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}>Favourites</NavLink>
                        </>
                    : null} */}


            {/* Esto tengo que corregirlo!!!!! */}
            {/* <div>{user ? <p>user logged in</p> : <p>user logged out</p>}</div>
            <div>{user ? <button onClick={logout}>Log out</button> : <Link to='/login'>Login</Link>}</div> */}
            {/* Tengo que borrar después el link de react - dom de impoort cuando lo corriga... */}


