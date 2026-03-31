import React from 'react'
import HP_nav from './HP_nav'
import Login from './Login'
import SignUp from './SignUp'
import Error_404 from './Error_404'
import HP_hero from './HP_hero'
import Password_redirect from './Password_redirect'
import Redirect_error from './Redirect_error'



export default function HomePage() {
  return (
    <>
    
      <HP_nav/>
      <HP_hero/>
      {/* <Password_redirect/> */}

    </>
  )
}
