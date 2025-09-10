import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import SignIn from '../pages/AuthPages/SignIn';

const ProtectedRoutes = ({children}) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    console.log(isLoggedIn,"CGHECK")
  return (
    <>{
        isLoggedIn ? children : ""
    }
    </>
  )
}

export default ProtectedRoutes