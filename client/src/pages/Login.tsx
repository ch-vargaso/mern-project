import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext';
type Props ={} 

function Login({ }: Props) {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState<SubmitLoginData>({
    email: "",
    password: ""
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e: FormEvent <HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 5) {
      alert("password too short")
    } else {
      login(formData.email, formData.password);
    }
    
  }

  return (
    <div className='login_page-container'>
      <div className='login_container'>
        <h1>Welcome to Graffitis</h1>
        <form onSubmit={handleSubmit} className='login_form'>
          <label htmlFor="email" className='login_label' ><b>E-Mail Address</b></label>
          <input type="email" name="email" placeholder='Email' onChange={handleChange} className='login_input' /><br />
          <label htmlFor="password" className='login_label'><b>Password</b></label>
          <input type="password" name="password" placeholder='Password' onChange={handleChange} className='login_input' /><br />
          <button type='submit' className='login_button' >Login</button>
        </form>
      </div>
    </div>
  )
};

export default Login