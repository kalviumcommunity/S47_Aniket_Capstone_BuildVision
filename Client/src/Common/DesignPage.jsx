import React from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import { useAuth0 } from '@auth0/auth0-react';

function DesignPage() {
  const { user, isAuthenticated, isLoading } = useAuth0;

  if(isLoading){
    return <div>Loading...</div>
  }
  console.log(user)
  return (
    isAuthenticated &&(
    <>
    <div className={navcss.navbar}>
        <NavigationBar/>
        <div>DesignPage</div>
    </div>
    </>
    )
  )
}

export default DesignPage