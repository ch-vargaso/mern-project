import React from 'react'
import ProfileNavBar from '../components/ProfileNavBar'

function ProfilePosts() {
    return (
        <div>
            <ProfileNavBar /><br />
            <button>+ create a new post (modal...)</button>

            
                <form >
                <label htmlFor="file"><b>Select your File</b></label><br />
                <input type="file" name='graffiti' accept='image/png, image/jpg, image/jpeg' //onChange={handleFile}// 
                /><br /><br />
                    <textarea />
                    <button>submit</button>
                {/* value={inputValue} onChange={handleOnChange} */}

                </form>
                <div className='posts-page-container' >
                    <div className='post-container'>
                        <h2>Post 1 (Do a Component...) </h2>
                        <img className='post-img' src="/images/bike.jpg" alt="bike" /><br />
                        <p>Sector/ Stadtteil: Prenzlauer Berg</p>
                        <p>adress (optional): Eberswalder Straße 5</p>
                        <p>tags.... con eso se puede buscar en la pagina!!</p>
                        <p>description:</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In odio totam dolorum provident et enim vitae reiciendis, natus excepturi tempora quibusdam architecto nostrum? Ullam harum distinctio quisquam officiis quia id.</p>
                        <p>where to fin it on the map... (Link the Google Maps)</p>
                    </div>
                    <div className='post-container' >
                        <h2>Post 2 (Do a Component...) </h2>
                        <img className='post-img' src="/images/kitten-playing.gif" alt="bike" /><br />
                        <p>Sector/ Stadtteil: Prenzlauer Berg</p>
                        <p>adress (optional): Eberswalder Straße 5</p>
                        <p>tags.... con eso se puede buscar en la pagina!!</p>
                        <p>description:</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In odio totam dolorum provident et enim vitae reiciendis, natus excepturi tempora quibusdam architecto nostrum? Ullam harum distinctio quisquam officiis quia id.</p>
                        <p>where to fin it on the map... (Link the Google Maps)</p>
                    </div>
                </div>
        </div>
    );
};

export default ProfilePosts