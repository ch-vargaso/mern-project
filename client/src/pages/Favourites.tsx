import React, { useContext, useEffect, useState } from 'react'
import ProfileNavBar from '../components/ProfileNavBar'
import AuthContext from '../contexts/AuthContext'
import Post from '../components/Post';

function Favourites() {
  const { user } = useContext(AuthContext);
  const FavouritesArray = (user?.favourites)
  const [isfavourite, setIsFavourite] = useState(false);


  return (
      <div>
      <ProfileNavBar />
                  <div className='posts-page-container' >
                {FavouritesArray && FavouritesArray.map((post: Post) => {
                    return ( 
                            < Post key={post._id} user_post={post} /> 
                    )
                })}
            </div>   
      
          <h1>Not Favourites yet... in progress...</h1>
    </div>
  )
}

export default Favourites