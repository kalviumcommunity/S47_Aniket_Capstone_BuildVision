import React from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'

function DesignPage() {
  return (
    <>
    <div className={navcss.navbar}>
        <NavigationBar/>
        <div>DesignPage</div>
    </div>
    </>
  )
}

export default DesignPage