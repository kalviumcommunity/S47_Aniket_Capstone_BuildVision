import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import navcss from "../css/Navigation.module.css"
import menu from "../../Assets/menu.png"
import archi from "../../Assets/arcitect.png"
import design from "../../Assets/design.png"
import profile from "../../Assets/profile.png"
import logoutimg from "../../Assets/logout.png"
import { useAuth0 } from "@auth0/auth0-react";

function NavigationBar() {
  const [toggle, settoggle] = useState(false)
  const { logout } = useAuth0();

  const togglebtn = () => {
    settoggle(!toggle)
  }

  const erase = () => {
    document.cookie = "Role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "Email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }


  const email = localStorage.getItem("Email")
  const role = localStorage.getItem("Role")

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
    <div>

      <nav className={navcss.mainnav}>
        <div className={navcss.nav}>
          <Link><div className={navcss.navicon}><img src={menu} alt="" className={navcss.menu} onClick={togglebtn} /><p className={navcss.navtext}>Menu</p></div></Link>
          <Link to="/DesignPage"><div className={navcss.navicon}><img src={design} alt="" className={navcss.design} /><p className={navcss.navtext}>Design</p></div></Link>
          <Link to="/ArchiProfile"><div className={navcss.navicon}><img src={archi} alt="" className={navcss.archi} /><p className={navcss.navtext}>Architect</p></div></Link>
        </div>
        <div className={navcss.nav}>
          <Link to={`/Profile/${role}/${email}`}><div className={navcss.navicon}><img src={profile} alt="" className={navcss.profile} /><p className={navcss.navtext}>Profile</p></div></Link>
          <div className={navcss.navicon} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} onClickCapture={erase()}><img src={logoutimg} alt="" className={navcss.logout} /><p className={navcss.navtext} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log-Out</p></div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar