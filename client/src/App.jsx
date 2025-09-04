import React from 'react'
import SignIn from '../pages/AuthPages/SignIn.jsx'
import OtpVerification from '../pages/AuthPages/OtpVerification.jsx'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate();
  return (
    <>
    <button className='cursor-pointer' onClick={()=>navigate("/login-register")}>Go to login and register page</button>
    <br />
    <button className='cursor-pointer' onClick={()=>navigate("/otp-verification")}>Go to login and register page</button>
    </>
  )
}

export default App