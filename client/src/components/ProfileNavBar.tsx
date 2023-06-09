import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function ProfileNavBar() {
    const location = useLocation();
    return (
        <>
            <div className='profile_navbar_container'>
                    <NavLink end to={'/profile'} className={({ isActive }) => isActive ? 'profile_navbar_active_page' : 'profile_navbar_link'}><p>My Posts</p></NavLink>
                    <NavLink to={'/profile/favourites'} className={({ isActive }) => isActive ? 'profile_navbar_active_page' : 'profile_navbar_link'}><p>Favourites</p></NavLink>
            </div>
        </>

    );
}

export default ProfileNavBar