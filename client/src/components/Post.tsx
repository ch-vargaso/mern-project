import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import Comment from './Comment'
import getToken from '../utils/getToken'
import Favourites from '../pages/Favourites'
import { Link } from 'react-router-dom'
// import { fail } from 'assert'

type Props = {
    user_post: Post
}

const Post = (props: Props) => {
    const { user, fetchActiveUser } = useContext(AuthContext)
    const [isfavourite, setIsFavourite] = useState(false);
    const [likes, setLikes] = useState([])

        
    // console.log("favoritos!!!", FavouritesArray);

    useEffect(() => {
        if (user) {
            const FavouritesArray = user.favourites
            const check = FavouritesArray.some((e: { _id: any }) => {
                return (
                    e._id === props.user_post._id
                )
            });
            setIsFavourite(check);
            console.log("favourite check", check)
        }
    
    }, [user]);

    // Only when we create the activer user it will be work, that is the reason of the conditional in the UserEffect

    //     useEffect(() => {
    //     const check = FavouritesArray.some((id : string) => {
    //         return (
    //             id === props.user_post._id
    //         )
    //     });
    //     setIsFavourite(check);
    
    //       console.log("favourite check", check)
    // }, [FavouritesArray]);
    
    

    // try to update a post...
    const [updatePostData, setUpdatePostData] = useState<postFormData>({
        title: "",
        image: "",
        sector: "",
        address: "",
        tags: [""],
        // tengo que trabajar en eso... cómo se crean los hashtags??????
        description: "",
    });
        const handleChange = (e: { target: { name: string; value: string | [string]; }; }) => {
        setUpdatePostData({ ...updatePostData, [e.target.name]: e.target.value });
    };
    const handleFile = (e: any) => {
        setUpdatePostData({ ...updatePostData, [e.target.name]: e.target.files[0] })
        // donde está si quiero subir varias imagenes??????
    };

    const handleEditPostSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const token = getToken();
        if (!token) {
            alert("there is no token!")
            return
        }
        console.log(updatePostData)
        const submitPostData = new FormData();
        if (updatePostData.title) {
            submitPostData.append("title", updatePostData.title)
        }
        if (updatePostData.image) {
            submitPostData.append("image", updatePostData.image)
        }
        if (updatePostData.sector) {
            submitPostData.append("sector", updatePostData.sector)
        }
        if (updatePostData.address) {
            submitPostData.append("address", updatePostData.address)
        }
        if (updatePostData.tags) {
            submitPostData.append("tags", updatePostData.tags)
        }
        if (updatePostData.description) {
            submitPostData.append("description", updatePostData.description)
        }
        submitPostData.append("_id", props.user_post._id)
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: submitPostData
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}posts/update`, requestOptions);
            const result = await response.json();
            if (token) {
                fetchActiveUser(token)
            };
            console.log(result)
            alert("siiiiiiiii, lograste hacer el update del possssssst!!!!!! :)")
        } catch (error) {
            console.log(error)
            alert("something went wrong with the update....")
        }
    };

// ++++++++++++++++++   try to DELETE a post..   ++++++++++++++++++++++
    

    const handleDeletePostSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const token = getToken();
        if (!token) {
            alert("there is no token")
            return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const urlencoded = new URLSearchParams();
        urlencoded.append("_id", props.user_post._id);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}posts/delete`, requestOptions);
            const result = response.json();
            if (token) {
                fetchActiveUser(token)
            }
            console.log(result)
            alert("post deleted")
        } catch (error) {
            console.log('error :>> ', error);
            alert("error deleting the post...")
        }
    };

     const likeSubmit = async (e: { preventDefault: () => void }) => {
                            e.preventDefault();
                            if (user) {
                                const token = localStorage.getItem("token")
                                const headers = new Headers();
                                headers.append("Authorization", `Bearer ${token}`);
                                const urlencoded = new URLSearchParams();
                                urlencoded.append("postId", props.user_post._id);
                                const requestOptions = {
                                    method: 'POST',
                                    headers: headers,
                                    body: urlencoded,
                                };
                                try {
                                    const response = await fetch(`${process.env.REACT_APP_BASE_URL}posts/like`, requestOptions);
                                    const result = await response.json();
                                    console.log("este es el array para actualiuzar...",result)
                                    setIsFavourite(true)
                                    setLikes(result)                                        
                                    if (token) {
                                        fetchActiveUser(token)
                                    };

                                } catch (error) {
                                    console.log(error)
                                    alert("something went wrong with the like ");
                                }
                                
                            }
                        };

                        const unlikeSubmit = async (e: { preventDefault: () => void }) => {
                            e.preventDefault();
                            if (user) {
                                const token = localStorage.getItem("token")
                                const headers = new Headers();
                                headers.append("Authorization", `Bearer ${token}`);
                                const urlencoded = new URLSearchParams();
                                urlencoded.append("postId", props.user_post._id);
                                const requestOptions = {
                                    method: 'POST',
                                    headers: headers,
                                    body: urlencoded,
                                };
                                try {
                                    const response = await fetch(`${process.env.REACT_APP_BASE_URL}posts/unlike`, requestOptions);
                                    const result = await response.json();
                                    console.log(result)
                                    setIsFavourite(false)
                                    setLikes(result)
                                    if (token) {
                                        fetchActiveUser(token)
                                    };
                                } catch (error) {
                                    console.log(error)
                                    alert("something went wrong with the unlike ");
                                }
                            }            
                        };
    
    
    
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [optionsModal, setOptionsModal] = useState(false);
    const toogleModal = () => {
        setModal(!modal)
    
    }
    const toogleDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }
    const tooglePostOptionsModal = (e: any) => {
        e.stopPropagation() 
        setOptionsModal(!optionsModal)
    }
    const formatDate = (date: string) => {
        const dateObject = new Date(date)
        return dateObject.toDateString();
    }

    window.onclick = () => {
        setOptionsModal(false)
        console.log("testing")
    }

    const handleDeleteCommentSubmit = async (e: { preventDefault: () => void; }, id: string) => {
        e.preventDefault();
        const token = getToken();
        if (!token) {
            alert("there is no token")
            return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const urlencoded = new URLSearchParams();
        urlencoded.append("_id", id);
        
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}comments/delete`, requestOptions);
            const result = response.json();
            if (token) {
                fetchActiveUser(token)
            }
            console.log(result)
            alert("comment deleted")
        } catch (error) {
            console.log('error :>> ', error);
            alert("error deleting the comment...")
        }
    };


// find the element when i am clicking and so having the information of the post 
    

    return (

        <>
            <div key={props.user_post._id} className='post-container' >

                {(user && user._id === props.user_post.author._id) && (
                    <div className='options_post_container'>
                        {optionsModal &&
                            <div className='post_options_modal' onClick={tooglePostOptionsModal} >
                                <div className='post_options_modal_overplay' >
                                    <div className='post_options_container'>
                                        <div className='post_options_btns_container'>
                                            {(user && user._id === props.user_post.author._id) && (<button onClick={toogleModal} className='edit_post_modal_trigger_btn' >
                                                <span className="material-symbols-outlined">stylus_note</span>
                                                <h4 >Edit Post</h4>
                                            </button>)}
                                        
                                            {(user && user._id === props.user_post.author._id) && (<button className='delete_post_modal_trigger_btn' onClick={toogleDeleteModal}  >
                                                <span className="material-symbols-outlined">delete</span>
                                                <h4>Delete Post</h4>
                                            </button>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>)}

                <div className='post_top_container'>
                    <div className='post_title_container'>
                        <h3 className='post_title'>{props.user_post.title}</h3>  
                    </div>   
                    {(user && user._id === props.user_post.author._id) && (
                        <div className='post_options_modal_trigger_container'>
                            <button className='post_options_modal_trigger_btn' onClick={tooglePostOptionsModal} >                                
                                <span className="material-symbols-outlined">edit_note</span>                                  
                            </button>            
                        </div>)}
                </div>
                
                <div className='post_img__container'>
                    <img className='post_img' src={props.user_post?.image} alt="no carga..." />
                </div>
    
                <div className='like_container'>
                    {user ? !isfavourite ? <img src="/images/likeempty.png" alt="like" onClick={likeSubmit} /> :
                    <img src="/images/likefull.png" alt="liked" onClick={unlikeSubmit} /> : null}
                </div>
                <hr />
                <div className='post_text_container' >
                    <div className='author'>
                        <h4>Posted by:</h4>
                        <Link to={''}> {props.user_post.author.username}</Link>
                    </div>
                    <div className='sector'>
                        <h4>Sector:</h4>
                        <p>{props.user_post.sector}</p>
                    </div>
                    <div className='address'>
                        <h4>Address: </h4>
                        <p>{props.user_post.address}</p>
                    </div>
                    <div className='tags'>
                        <h4>Tags: {props.user_post.tags}</h4>
                    </div>
                </div>
                <hr />
                <div className='description_container'>
                    <h3>Description:</h3>
                    <p>{props.user_post.description}</p>
                </div>
                
                <div className='chat_container' >
                    <div className='messages_scroll_container' >
                        {props.user_post.comments && props.user_post.comments.map((comment: Comment) => {
                            return (
                                <div key={comment._id} >
                                    <div className='messages_container' >
                                        <div className='above' >
                                
                                            <div className='date'>
                                                <h4 className='author'><Link to={''}>{comment.author.username}</Link> on:</h4>
                                                <p>{formatDate(comment.createdAt)}</p>
                                            </div>
                                        
                                            {(user && user._id === comment.author._id) &&
                                                (<button onClick={(e) => { handleDeleteCommentSubmit(e, comment._id) }}>
                                                    <span className="material-symbols-outlined">close</span>
                                                </button>
                                            )}
                                            
                                        </div>
                                        {/* <p className='author'><Link to={''}>{comment.author.username}</Link></p> */}
                                        <p className='text' >{comment.text}</p>
                                    </div>
                                                
                                </div>
                            )
                        })}
                    </div>
                    < Comment post_id={props.user_post._id} />
                </div>
            </div>

            {modal && (
                <div className='new_post_modal'>
                    <div className='edit_new_post_modal' onClick={toogleModal} >
                        <div className='edit_new_post_modal_container' onClick={e => e.stopPropagation()} >
                        
                            <div className='new_post_modal_span_container'>
                                <button className='new_post_modal_span_btn' >
                                    <span className="material-symbols-outlined" onClick={toogleModal}>close</span>
                                </button>
                            </div>
                            <form className='new_post_form' onSubmit={handleEditPostSubmit}>
                                <label htmlFor="new_post_title" >Title</label>
                                <input type="text" id="new_post_title" name="title" placeholder='title' onChange={handleChange} />
                               
                                <label htmlFor="new_post_img"  >Image</label>
                                <input type="file" id="new_post_img" name='image' accept='image/png, image/jpg, image/jpeg' onChange={handleFile} />
                                
                                <label htmlFor="new_post_sector"  >Sector</label>
                                <input type="text" id="new_post_sector" name="sector" placeholder='sector' onChange={handleChange} />
                       
                                <label htmlFor="new_post_address"  >Address</label>
                                <input type="text" id="new_post_address" name="address" placeholder='address' onChange={handleChange} />
                        
                                <label htmlFor="new_post_tags">Add Tags</label>
                                <input type="text" id="new_post_tags" name="tags" placeholder='tags' onChange={handleChange} />
                     
                                <label htmlFor="new_post_description" >Description</label>
                                <textarea id="new_post_description" name="description" placeholder='add a description' onChange={handleChange} />
                                
                                {/* <p>Google Maps optional</p> */}
                                <button type='submit'>Save Changes</button>
                            
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {deleteModal && (
                <div className='delete_post_modal' >
                    <div className='delete_modal_overlay' onClick={toogleDeleteModal}>
                        <div className='delete_post_modal_container' onClick={e => e.stopPropagation()} >
                            <form onSubmit={handleDeletePostSubmit} >
                                <div className='delete_post_modal_text' >
                                    <h3>Do you want to delete your post?</h3>
                                </div>
                                <div className='delete_post_modal_btns'>
                                    <button className='btn_yes' type='submit'>Continue</button>
                                    <button className='btn_no' onClick={toogleDeleteModal}>Cancel</button>
                                </div>
                        
                            </form>
                        </div>
                    </div>
                </div>  
            )}
        </>
    );
};

export default Post