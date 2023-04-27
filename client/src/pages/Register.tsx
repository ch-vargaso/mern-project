import React, { useState } from 'react'

// interface FormData {
//     email: String,
//     username: String,
//     password: String

// }

function Register() {
    // const [formData, setFormData] = useState({} as FormData); esto con el interface typeScript arriba!
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    });
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("email", formData.email);
        urlencoded.append("username", formData.username);
        urlencoded.append("password", formData.password);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };
        try {
            const response = await fetch("http://localhost:5001/api/users/new", requestOptions);
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
  

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='Email' onChange={handleChange}/>
                <input type="text" name="username" placeholder='Username' onChange={handleChange}/>
                <input type="password" name="password" placeholder='Password' onChange={handleChange}/>
                <button type='submit'>Enter the Matrix</button>
                <button onClick={onClickHandler}>prueba para .env </button>
            </form>
        </div>
  )
}

export default Register