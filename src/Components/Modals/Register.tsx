import React, { useState } from 'react'
import { Props } from './SignIn'

export default function Register({setModal, setUser}: Props) {
    const [error, setError] = useState('')
    //@ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()

        const fullName = e.target.fullName.value
        const email = e.target.email.value
        const phoneNumber = e.target.phone.value
        const password = e.target.password.value

        fetch('http://localhost:8000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({fullName, email, phoneNumber, password})
        }).then((resp) => resp.json()).then((data) =>{
            if (data.error){
                setError('This email is already in use.')
            }else{
                localStorage.token = data.token;
                setUser(data.user)
                setModal('new-user')
            }
        } )
    }
  return (
      <div  className="modal-wrapper">
          <div onClick={(e) => {e.stopPropagation()}}  className="modal-container">
              <button className='close-btn' onClick={() => {setModal('')}} >X</button>
              <h3>Register</h3>
              <form onSubmit={handleSubmit}>
                  <input type="text"  placeholder='Full Name' name='fullName' required/>
                  <input type="email"  placeholder='Email' name='email' required/>
                  <input type="text"  placeholder='Fhone Number' name='phone' required/>
                  <input type="password"  placeholder='Password' name='password' required/>
                  <button type='submit'>Register</button>
              </form>
              {
                  error !== ''? <p className='modals-error'>{error}</p>: null
              }
              <p>Already have an account?
                  <span onClick={() => {setModal('sign-in')}}>Sign In</span>
              </p>
          </div>
    
    </div>
  )
}
