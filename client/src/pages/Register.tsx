import React, { useState } from 'react'

type Props ={}
// type Avatar = undefined | File 

interface FormData {
    email: string,
    username: string,
    password: string,
    avatar: Avatar
}

function Register(props: Props) {
    const [displayImage, setDisplayImage] = useState("");
    // const [formData, setFormData] = useState({} as FormData); esto con el interface typeScript arriba!
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        username: "",
        avatar: ""
    });
    
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFile = (e: any) => {
        // console.log( typeof e.target.files[0])
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
        // si quiero esciger varias imagenes tengo que hacer un map???
        // const localURL = URL.createObjectURL(e.target.files[0]);
        if(e.target.files[0]){
        const localURL = URL.createObjectURL(e.target.files[0]);
        console.log(localURL);
        setDisplayImage(localURL);
        } else {
            // setDisplayImage("/images/cat.jpg")
            setDisplayImage(" ")

        }
    };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData);
        // const myHeaders = new Headers();
        const submitData = new FormData();
        submitData.append("email", formData.email);
        submitData.append("username", formData.username);
        submitData.append("password", formData.password);
        submitData.append("avatar", formData.avatar);

        const requestOptions = {
            method: 'POST',
            // headers: myHeaders,
            body: submitData
        };
        try {
            // const response = await fetch("http://localhost:5001/api/users/new", requestOptions);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/new`, requestOptions);
            const result = await response.json();
            console.log(result);
            alert("successfully registred");
            
        } catch (error) {
            console.log(error);
            alert("Something went wrong - OMG! check console");
        }
    };

    return (
        <div>
            <div className='register_form_container' >
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit} className='register_form'>
                    <label htmlFor="email"><b>E-Mail Address</b></label>
                    <input type="email" name="email" placeholder='Email' onChange={handleChange} />
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" name="username" placeholder='Username' onChange={handleChange} />
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" name="password" placeholder='Password' onChange={handleChange} />

                    <label htmlFor="file"><b>Select Avatar</b></label>
                    <div className='register_select_avatar_btn'>
                        <span className="material-symbols-outlined">photo_library</span>                        
                        <p>Choose Image</p>
                        <input type="file" name='avatar' accept='image/png, image/jpg, image/jpeg' onChange={handleFile}/>                        
                    </div>
                    {/* <input type="file" name='avatar' accept='image/png, image/jpg, image/jpeg' onChange={handleFile} /> */}
                   {displayImage && <img src={displayImage} alt="uploadimg" /> } 
                    {/* hay que hacer el css de la pagina de registro */}
                    <button type='submit'>Enter the Matrix</button>
                </form>
            </div>
            
        </div>
  )
}

export default Register