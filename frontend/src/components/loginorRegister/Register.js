import React from 'react'
import {SignUp} from '@clerk/clerk-react'

function Register() {
  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <SignUp />
    </div>
  )
}

export default Register