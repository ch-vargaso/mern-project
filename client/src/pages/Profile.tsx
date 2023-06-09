import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Outlet, useLocation, useParams } from 'react-router-dom';
import getToken from '../utils/getToken';
import ProfileNavBar from '../components/ProfileNavBar';
import ProfilePosts from './ProfilePosts';

interface UpdateUser{
    email: string,
    username: string 
}

function Profile() {
  // let { id } = useParams()
  // Preguntar como se hace...
  // console.log("useParams", id)
  const { user, fetchActiveUser } = useContext(AuthContext);
  const [currentUser, setcurrentUser] = useState<null | User>();
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const toogleModal = () => {
    setModal(!modal)
  }

 // try to update user...
  const [updateData, setUpdateData] = useState({
    name: "",
    username:"",
    email: "",
    about: "", 
    avatar: ""
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // falta la de la imagen...
  const handleFile = (e: any) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.files[0] })
  };
  
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
    if(updateData.name){
      submitData.append("name", updateData.name);
    }
     if (updateData.username) {
      submitData.append("username", updateData.username);
    }
    if (updateData.email) {
      submitData.append("email", updateData.email);
    }
    if (updateData.about) {
      submitData.append("about", updateData.about);
    }
    if (updateData.avatar) {
      submitData.append("avatar", updateData.avatar);
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
      const token = localStorage.getItem("token")
      if (token) {
        fetchActiveUser(token)
      };
      console.log(result);
      alert("user updated :)")
    } catch (error) {
      console.log(error);
      alert("something went wrong, try it again");
    }
  };

  const posts = user?.posts

  return (
    <div>
      <div>
        <div className='profile_top'>
          <div className='profile_container'>
            <div className='profile_info_container' >
              <div className='profile_header' >
                <div className='avatar_container'>
                  {user && <img className='profileimg' src={user.avatar} alt={user.username} />}
                  <form onSubmit={handleSubmit}>
                    <div className='avatar_edit_button'>
                      <span className="material-symbols-outlined">photo_library</span>
                      <p className='avatar_edit_text' >Change Avatar</p>
                      <input className='avatar_edit_input' type="file" name='avatar' accept='image/png, image/jpg, image/jpeg' />
                    </div>
                  </form>
                  
            
                </div>
                {user && <h2 className='profile_header_text' >{user.username}</h2>}
              </div>
              <hr />
              <div className='profile_info_text' >
                {user && <h4>real name: {user.name}</h4>}
                {user && <h4>Nickname:  {user.username}</h4>}
                {user && <h4>About you: {user.about}</h4>}
                {/* <h4>Last loggin: (falta esta función...)</h4> */}
              </div>
            </div>

            <div className='edit_btn_container'>
              <button onClick={toogleModal} id="ModalBtn " className='edit_profilebtn'>
                <span className="material-symbols-outlined">edit</span>
                <h4 className='edit_button_text'>Edit Profile</h4>
              </button>
            </div>
          </div>
                <div>
        {location.pathname.includes('favourites') || location.pathname.includes('posts') || location.pathname.includes('profile') ?
              <Outlet context={{posts}} /> :
          <>
            <ProfileNavBar />
          </>
        }
        {/* <ProfilePosts/> */}
      </div>

          
        </div>

        {modal && (
          <div className='modal'>
            <div id='editModal' className='edit_profile_modal' onClick={toogleModal} >
              <div className='edit_profile_modal_container' onClick={e => e.stopPropagation()} >

                <div className='span_container' >
                  <button className='span_btn_modal'>
                    <span className="material-symbols-outlined" onClick={toogleModal}>close</span>
                  </button>
                </div>

                <form className='edit_profile_form' onSubmit={handleSubmit} >
                  <label htmlFor="name"><b>Name</b></label>
                  <input type="text" name="name" placeholder='Name' onChange={handleChange} />
                  
                  <label htmlFor="username"><b>Username</b></label>
                  <input type="text" name="username" placeholder='Username' onChange={handleChange} />

                  <label htmlFor="email"><b>E-Mail Address</b></label>
                  <input type="email" name="email" placeholder='Email' onChange={handleChange} />

                  <label htmlFor="about"><b>About</b></label>
                  <textarea name='about' placeholder='write something...' onChange={handleChange} />

                  <label htmlFor="file">Change Avatar</label>
                  <input type="file" name='avatar' accept='image/png, image/jpg, image/jpeg' onChange={handleFile}/>

                  <button type='submit'>Update User</button>
                </form>
                
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Profile