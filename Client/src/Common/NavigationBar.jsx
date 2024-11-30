import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import navcss from "../css/Navigation.module.css"
import menu from "../../Assets/menu.png"
import archi from "../../Assets/arcitect.png"
import design from "../../Assets/design.png"
import profile from "../../Assets/profile.png"
import chat from "../../Assets/chat.png"
import logoutimg from "../../Assets/logout.png"
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

function NavigationBar() {
  const [id, setid] = useState("")
  const [toggle, settoggle] = useState(false)
  const { logout } = useAuth0();

  const togglebtn = () => {
    settoggle(!toggle)
  }

  const email = localStorage.getItem("Email")
  const role = localStorage.getItem("Role")

  // console.log(email,role)

  const exit = () => {
    logout({ returnTo: window.location.origin })
    localStorage.clear();
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/Profilefind/${role}/${email}`)
      .then((res) => setid(res.data._id))
      .catch((err) => {
        console.log(err)
      })
  }, [email, role])

  useEffect(() => {
    const sidebar = document.getElementsByClassName(navcss.mainnav)[0];
    const sidebarItems = document.querySelectorAll(`.${navcss.navicon}`);
    const text = document.querySelectorAll(`.${navcss.navtext}`);

    if (toggle) {
      sidebar.style.width = "24vh";
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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const sidebar = document.getElementsByClassName(navcss.mainnav)[0];
      if (sidebar && !sidebar.contains(e.target)) {
        settoggle(false);
      }
    };

    if (toggle) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [toggle]);

  return (
    <div>

      <nav className={navcss.mainnav}>
        <div className={navcss.navtop}>
          <Link><div className={navcss.navicon}><img src={menu} alt="" id={navcss.menu} className={navcss.img} onClick={togglebtn} /><p className={navcss.navtext}>Menu</p></div></Link>
          <Link to="/DesignPage"><div className={navcss.navicon} ><img src={design} alt="" id={navcss.design} className={navcss.img} /><p className={navcss.navtext}>Design</p></div></Link>
          <Link to="/ArchiProfile"><div className={navcss.navicon}><img src={archi} alt="" id={navcss.archi} className={navcss.img} /><p className={navcss.navtext}>Architect</p></div></Link>
          <Link to="/Chatting"><div className={navcss.navicon}><img src={chat} alt="" id={navcss.chat} className={navcss.img} /><p className={navcss.navtext}>Chatting</p></div></Link>
        </div>
        <div className={navcss.navbottom}>
          <Link to={`/Profile/${role}/${id}`}><div className={navcss.navicon}><img src={profile} alt="" id={navcss.profile} className={navcss.img} /><p className={navcss.navtext}>Profile</p></div></Link>

          <div className={navcss.navicon} onClick={exit}><img src={logoutimg} alt="" id={navcss.logout} className={navcss.img} /><p className={navcss.navtext}>Log-Out</p></div>

        </div>
      </nav>
    </div>
  )
}

export default NavigationBar