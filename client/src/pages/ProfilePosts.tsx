import React, { ReactNode, useContext, useState } from 'react'
import ProfileNavBar from '../components/ProfileNavBar'
import AuthContext from '../contexts/AuthContext';
import { type } from 'os';
import Comment from '../components/Comment';
import Post from '../components/Post';
import getToken from '../utils/getToken';

type Postimg = string | File
// type Tag = string[]


type Props = {}
interface postFormData{
    title: string,
    image: Postimg,
    sector: string,
    address: string,
    tags: any
    description: string,
}

function ProfilePosts(props: Props) {
    const { user, fetchActiveUser } = useContext(AuthContext);
    const [postFormData, setPostFormData] = useState<postFormData>({
        title: "",
        image: "", 
        sector: "",
        address: "",
        tags: [""],
        // tengo que trabajar en eso... cómo se crean los hashtags??????
        description: "",
    })
    const handleChange = (e: { target: { name: string; value: string | [string]; }; }) => {
        setPostFormData({ ...postFormData, [e.target.name]: e.target.value });
    };
    const handleFile = (e: any) => {
        setPostFormData({ ...postFormData, [e.target.name]: e.target.files[0] })
        // donde está si quiero subir varias imagenes??????
    };


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (user) {
            console.log(postFormData);
            const token = localStorage.getItem("token")
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            const submitData = new FormData();
            submitData.append("title", postFormData.title);
            submitData.append("image", postFormData.image);
            submitData.append("address", postFormData.address);
            submitData.append("author", user._id)
            submitData.append("tags", postFormData.tags)
            submitData.append("description", postFormData.description);
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: submitData,
            };
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}posts/new`, requestOptions);
                const result = await response.json();
                if (token) {
                    fetchActiveUser(token)
                };
                console.log(result)
                alert("post created :)")
            } catch (error) {
                console.log(error);
                alert("something went wrong, try and try!! ");
            }
        }
    };

    const [modal, setModal] = useState(false);
    const toogleModal = () => {
        setModal(!modal)
    }
    
    const postArray = (user?.posts)


    // ++++++++++++++++ FUNCTIONS FOR THE CHAT  ++++++++++++++++++++

    //            !!!!!!! CORREGIR TYPESCRIPT !!!!!!


    return (
        <div>
            <ProfileNavBar /><br />
            <button onClick={toogleModal} className='new_post_modal_trigger' >
                <span className="material-symbols-outlined">add_box</span>
                <h4 >Create Post</h4>
               </button>
            {modal && (
                <div className='new_post_modal'>
                    <div className='edit_new_post_modal' onClick={toogleModal} >
                        <div className='edit_new_post_modal_container' onClick={e => e.stopPropagation()} >
                        
                            <div className='new_post_modal_span_container'>
                                <button className='new_post_modal_span_btn' >
                                    <span className="material-symbols-outlined" onClick={toogleModal}>close</span>
                                </button>
                            </div>
                            <form className='new_post_form' onSubmit={handleSubmit}>
                                <label htmlFor="new_post_title" >Title</label>
                                <input type="text" id="new_post_title" name="title" placeholder='title'onChange={handleChange} />

                                <label htmlFor="new_post_img"  >Image</label>
                                <input type="file" id="new_post_img"name='image' accept='image/png, image/jpg, image/jpeg' onChange={handleFile}/>

                                <label htmlFor="new_post_sector"  >Sector</label>
                                <input type="text" id="new_post_sector" name="sector" placeholder='sector' onChange={handleChange}/>

                                <label htmlFor="new_post_address"  >Address</label>
                                <input type="text" id="new_post_address" name="address" placeholder='address' onChange={handleChange}/>

                                <label htmlFor="new_post_tags">Add Tags</label>
                                <input type="text" id="new_post_tags" name="tags" placeholder='tags' onChange={handleChange} />

                                <label htmlFor="new_post_description" >Description</label>
                                <textarea id="new_post_description" name="description" placeholder='Add a Description' onChange={handleChange}/>

                                {/* <p>Google Maps optional</p> */}
                                <button type='submit'>Create New Post</button>
                            
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div className='posts-page-container' >
                {postArray && postArray.map((post: Post) => {
                    return ( 
                            < Post key={post._id} user_post={post} /> 
                    )
                })}
            </div>   
        </div>
    );
};

export default ProfilePosts