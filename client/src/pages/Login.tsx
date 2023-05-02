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
    login(formData.email, formData.password);
  }

  return (
    <div>
      <h1>Login funcionando...</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder='Email' onChange={handleChange} />
        <input type="password" name="password" placeholder='Password' onChange={handleChange} />
        <button type='submit'>Log in!!</button>
      </form>
    </div>
  )
}

export default Login