import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Outlet, useLocation, useParams } from 'react-router-dom';
import getToken from '../utils/getToken';
import ProfileNavBar from '../components/ProfileNavBar';

interface UpdateUser{
    email: string,
    username: string 
}

function Profile() {
  // let { id } = useParams()
  // Preguntar como se hace...
  // console.log("useParams", id)
  const { user  } = useContext(AuthContext);
  const [currentUser, setcurrentUser] = useState<null | User>();
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const toogleModal = () => {
    setModal(!modal)
  }

// try to update user...
  const [updateData, setUpdateData] = useState({
    email: "",
    username: "" 
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // falta la de la imagen...

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("there is no token")
      return
    }


    console.log(updateData);

    const submitData = new FormData();
    // another conditionals to validate the certenty of the data 
    if (updateData.email) {
      submitData.append("email", updateData.email);
    }
    if (updateData.username) {
      submitData.append("username", updateData.username);
    }

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: submitData
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/update`, requestOptions);
      const result = await response.json();
      console.log(result);
      alert("user updated :)")
    } catch (error) {
      console.log(error);
      alert("something went wrong, try it again");
    }
  };

  return (
    <div>
      <h1>poner el graffiti favorito...</h1>
      <div>
        <div className='profile_top'>
          <div className='profile_container'>
            <div className='profile_info_container' >
              <div className='profile_header' >
                <div className='avatar_container'>
                  {user && <img className='profileimg' src={user.avatar} alt={user.username} />}
                  <button className='avatar_edit_button'>
                    <span className="material-symbols-outlined">photo_library</span>
                    <h4 className='avatar_edit_text'>Change Avatar</h4> </button>
                </div>
                {user && <h2 className='profile_header_text' >{user.username}</h2>}
              </div>
              <hr />
              <div className='profile_info_text' >
                <h4>real name: Lisa Simpson</h4>
                {user && <h4>Nickname:  {user.username}</h4>}
                <h4>About you: </h4>
                <h4>Last loggin: yesterday</h4>
              </div>
            </div>
            <div className='edit_btn_container'>
              
            
              <button onClick={toogleModal} id="ModalBtn " className='edit_profilebtn'>
                

                <span className="material-symbols-outlined">
                  edit
                </span>
                <h4 className='edit_button_text'>Edit Profile</h4>
              </button>
            </div>
          </div>
        </div>
        {modal && (
          <div className='modal'>
            <div id='editModal' className='edit_profile_modal' onClick={toogleModal} >
              <div className='edit_profile_modal_container' onClick={e => e.stopPropagation()} >
                <div className='span_container' >
                < span className='span_btn_modal' onClick={toogleModal}>Close [X]</span>

                </div>
                <form className='edit_profile_form' onSubmit={handleSubmit} >
                  <label htmlFor="email"><b> update E-Mail Address</b></label><br />
                  <input type="email" name="email" placeholder='Email' onChange={handleChange} /><br />
                  <label htmlFor="username"><b>update your Username</b></label><br />
                  <input type="text" name="username" placeholder='Username' onChange={handleChange} /><br />
                  <button type='submit'>Update User</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {location.pathname.includes('favourites') || location.pathname.includes('posts') ?
          <Outlet /> :
          <>
            <ProfileNavBar />
          </>
        }
      </div>
    </div>
  );
}

export default Profile