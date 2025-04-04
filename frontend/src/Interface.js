import React from 'react'
import NavBar from './components/navbar/NavBar'
import { Outlet } from 'react-router-dom'
// import Footer from './components/footer/Footer'
function Interface() {
  return (
    <>
    <div>
      <NavBar/>
    </div>
    <div className=''>
     <Outlet style={{"min-height": '70vh'}} />
    </div>
    {/* <div>
      <Footer/>
    </div> */}
    </>
  )
}

export default Interface