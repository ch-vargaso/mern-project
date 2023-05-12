import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function ProfileNavBar() {
    const location = useLocation();
    return (
        <>
            {/* {location.pathname.includes('profile') ? */}
                {/* <> */}
                    <NavLink to={'posts'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}>My Posts</NavLink>
                    <NavLink to={'favourites'} className={({ isActive }) => isActive ? 'active_page' : 'nav_link'}>Favourites</NavLink>
                {/* </>
                : null} */}
        </>

    );
}

export default ProfileNavBar