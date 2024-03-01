import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import navcss from "../css/Navigation.module.css"
import menu from "../../Assets/menu.png"
import archi from "../../Assets/arcitect.png"
import design from "../../Assets/design.png"
import profile from "../../Assets/profile.png"
import logout from "../../Assets/logout.png"

function NavigationBar() {
  const [toggle,settoggle]=useState(false)

  const togglebtn=()=>{
    settoggle(!toggle)
  }

  useEffect(() => {
    const sidebar = document.getElementsByClassName(navcss.mainnav)[0];
    const sidebarItems = document.querySelectorAll(`.${navcss.navicon}`);
    const text = document.querySelectorAll(`.${navcss.navtext}`);

    if (toggle) {
      sidebar.style.width = "23vh";
      sidebarItems.forEach(item => {
        item.style.borderRadius = "20px";
      });
      text.forEach(item => {
        item.style.display = "block";
      })
      
    } else {
      sidebar.style.width = "auto";
      sidebarItems.forEach(item => {
        item.style.borderRadius = "100%";
      });
      text.forEach(item => {
        item.style.display = "none";
      })
    }
  }, [toggle]);

  return (
    <nav className={navcss.mainnav}>
        <div className={navcss.nav}>
            <Link><div className={navcss.navicon}><img src={menu} alt="" className={navcss.menu} onClick={togglebtn}/><h2 className={navcss.navtext}>Menu</h2></div></Link>
            <Link to="/DesignPage"><div className={navcss.navicon}><img src={design} alt="" className={navcss.design}/><h2 className={navcss.navtext}>Design</h2></div></Link>
            <Link to="/Archiprofile"><div className={navcss.navicon}><img src={archi} alt="" className={navcss.archi}/><h2 className={navcss.navtext}>Architect</h2></div></Link>
        </div>
        <div className={navcss.nav}>
            <Link><div className={navcss.navicon}><img src={profile} alt="" className={navcss.profile}/><h2 className={navcss.navtext}>Profile</h2></div></Link>
            <Link><div className={navcss.navicon}><img src={logout} alt="" className={navcss.logout}/><h2 className={navcss.navtext}>Log-Out</h2></div></Link>
        </div>
    </nav>
  )
}

export default NavigationBar