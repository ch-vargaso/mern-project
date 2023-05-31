import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext';


type Props = {
    post_id: string,
}


const Comment = (props: Props) => {
    const { user, fetchActiveUser } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('')



    const [commentFormData, setCommentFormData] = useState<commentFormData>({
        text: ""
     });
        const chatHandleOnChange = (
            e: { target: { name: string; id: string; value: string } }) => {
        setCommentFormData({
            ...commentFormData, [e.target.name]: e.target.value,
           });
        setInputValue(e.target.value)

        };
        const chatHandleSubmitv = async (
        e: { preventDefault: () => void }) => {
            e.preventDefault();
            
        if (user) {
            console.log(commentFormData); 
            const token = localStorage.getItem("token")
            const headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            headers.append("Authorization", `Bearer ${token}`);
            const urlencoded = new URLSearchParams();
            urlencoded.append("author", user._id);
            urlencoded.append("text", commentFormData.text);
            urlencoded.append("post", props.post_id);
                // de donde obtengo el post id??????
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: urlencoded
            };
             
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}comments/new`, requestOptions);
                const result = await response.json();
                const token = localStorage.getItem("token")
                if (token) {
                    fetchActiveUser(token)
                     setInputValue('')
                }
                console.log(result)
                // alert("comentario creado!!!!!!!!")
               
            } catch (error) {
                console.log(error);
                alert("no se creo el comentario, grosero!!!!")  
            }        
        }
    }

    return (
    
        <form className='comments_container' onSubmit={chatHandleSubmitv}>
            <textarea className='textarea_comment' key={props.post_id} name="text"
                id={props.post_id} placeholder='Write a comment...'
                value={inputValue}
                onChange={chatHandleOnChange}></textarea>
            {/* () => chatHandleOnChange(post._id, text) */}
            {/* value={inputValue} */}
            <button type='submit'>Comment</button>
        </form>
    )
};

export default Comment