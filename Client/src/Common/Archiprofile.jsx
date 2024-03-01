import React from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'

function Archiprofile() {
  return (
    <>
        <div className={navcss.navbar}>
          <NavigationBar/>
          <div>Archiprofile</div>
        </div>
    </>
  )
}

export default Archiprofile