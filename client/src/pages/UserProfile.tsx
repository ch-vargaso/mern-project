import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ProfileNavBar from '../components/ProfileNavBar'
import ProfilePosts from './ProfilePosts'

type Props = {}

const UserProfile = (props: Props) => {
    const [userviewed, setUserView] = useState<User | null>(null)
    const { id } = useParams();
    console.log("el id????", id)
    
    
    // falta hacer populate en la funcion get user
    const getUser = async () => {
        const token = localStorage.getItem("token")
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/id/${id}`, requestOptions);
            // falta el id de usePArams....
            const result = await response.json();
            setUserView(result)
            console.log("usuario que viene del id...", result)
           
        } catch (error) {
            console.log('error :>> ', error);
            
        }
    }
    useEffect(() => {
        getUser();
       
    }, []);



  return (
    <div>
      <div>
        <div className='profile_top'>
          <div className='profile_container'>
            <div className='profile_info_container' >
              <div className='profile_header' >
                <div className='avatar_container'>
                  {userviewed && <img className='profileimg' src={userviewed.avatar} alt={userviewed.username} />}

                </div>
                {userviewed && <h2 className='profile_header_text' >{userviewed.username}</h2>}
              </div>
              <hr />
              <div className='profile_info_text' >
                {userviewed && <h4>real name: {userviewed.name}</h4>}
                {userviewed && <h4>Nickname:  {userviewed.username}</h4>}
                {userviewed && <h4>About you: {userviewed.about}</h4>}
                {/* <h4>Last loggin: (falta esta función...)</h4> */}
              </div>
            </div>
          </div>

          <div>
            <ProfilePosts  />
            {/* {location.pathname.includes('posts') || location.pathname.includes('id/:id') ?
              <Outlet /> :
              <>
                <ProfileNavBar />
              </>
            } */}
          </div>
        </div>
      </div>
    </div>
  );
}
      

export default UserProfile