import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons'

const SignUp = () => {
  const [formdata,setFormdata] =useState({
    email:'',
    username:'',
    pasword:'',
    password2:''
  })
  const handleOnChange = (e)=>{
    setFormdata(
      {
        ...formdata,[e.target.name]:e.target.value
      }
    )

  }
  const {email,username,password,password2}=formdata
  const [error,setError] = useState('')

  const handleSubmit= async (e) =>{
    e.preventdfault()
    if(!email || !username || !password || !password2 ){
      setError('all field is required')
      console.log()

    }
    else{

    }

  }
  
  return (


    

    <div>
      <div className='wrapper1'>
        <div className='Sign-up-box'>
        <p style={{ color: 'red' }}>{error ? error : " "}</p>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
         <div className='input-box'>
            <label htmlFor="email">email:</label>
            <span className='icon'>
            <FontAwesomeIcon icon={faEnvelope}/>
            </span>
            <input type='text' className='email' name='email' value={email} onChange={handleOnChange}/>
         </div>
         <div className='input-box'>
         <label htmlFor="username">username:</label>
         <span className='icon'>
          <FontAwesomeIcon icon={faUser}/>
         </span>
         <input type='text' className='username' name='username' value={username} onChange={handleOnChange}/>
         </div>
         <div className='input-box'>
         <label htmlFor="password">password:</label>
         <span className='icon'>
          <FontAwesomeIcon icon={faLock}/>
         </span>
         <input type='password' className='password' name='pasword' value={password} onChange={handleOnChange}/>
         </div>
         <div className='input-box'>
         <label htmlFor="password2">password2:</label>
         <span className='icon'>
          <FontAwesomeIcon icon={faLock}/>
         </span>
         <input type='password' className='password2' name='password2' value={password2} onChange={handleOnChange}/>
         </div>
         <button type='submit'className='button1'>Submit</button>
            
            
            
            
        </form>
        </div>
    </div>
    </div>
  )
}

export default SignUp
