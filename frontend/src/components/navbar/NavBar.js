import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton ,SignUpButton} from "@clerk/clerk-react";

function NavBar() {
  return (
    <div className='pb-3'>
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary fixed-top d-flex">
          <Link className="navbar-brand">Stock Market Dashboard</Link>
          
          {/* <div className="collapse navbar-collapse d-flex" id="navbarNav">
            <ul className="navbar-nav ms-auto p-1 justify-content-around">
              <li className="nav-item active">
                <Link className="nav-link" to='/'>Home </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/register'>Register</Link>
              </li>
              </ul>
              </div> */}
            <div className="d-flex ms-auto p-3 ">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton/>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
        
            </div>
              </nav>    </div>
  )
}

export default NavBar