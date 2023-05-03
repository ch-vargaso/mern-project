import React, { useState } from 'react'

type Props ={}
// type Avatar = undefined | File 

// interface FormData {
//     email: String,
//     username: String,
//     password: String
//     avatar: Avatar

// }

function Register(props: Props) {
    // const [formData, setFormData] = useState({} as FormData); esto con el interface typeScript arriba!
    const [formData, setFormData] = useState({
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
            alert("por fin!!! a la casa, well done!!!");

        } catch (error) {
            console.log(error);
            alert("Something went wrong - OMG! check console");
        }
    };

    const onClickHandler = () => {
        console.log("prueba...",`${process.env.REACT_APP_BASE_URL}`);
    }
  
    // alternative HandleSubmit
    // const handleSubmit = (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     console.log(formData);
    // };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"><b>E-Mail Address</b></label><br/>
                <input type="email" name="email" placeholder='Email' onChange={handleChange} /><br />
                <label htmlFor="username"><b>Username</b></label><br />
                <input type="text" name="username" placeholder='Username' onChange={handleChange} /><br />
                <label htmlFor="password"><b>Password</b></label><br />
                <input type="password" name="password" placeholder='Password' onChange={handleChange} /><br />
                <label htmlFor="file"><b>Select Avatar</b></label><br />
                <input type="file" name='avatar' accept='image/png, image/jpg, image/jpeg' onChange={handleFile} /><br /><br />
                <button type='submit'>Enter the Matrix</button>
            </form>
            <br />
                <button onClick={onClickHandler}>prueba para .env </button>
        </div>
  )
}

export default Register