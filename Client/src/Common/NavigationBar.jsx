import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import navcss from "../css/Navigation.module.css"
import menu from "../../Assets/menu.png"
import archi from "../../Assets/arcitect.png"
import design from "../../Assets/design.png"
import profile from "../../Assets/profile.png"
import logoutimg from "../../Assets/logout.png"
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

function NavigationBar() {
  const[id,setid]=useState("")
  const [toggle, settoggle] = useState(false)
  const { logout } = useAuth0();
  const navigate=useNavigate()

  const togglebtn = () => {
    settoggle(!toggle)
  }

  const email = localStorage.getItem("Email")
  const role = localStorage.getItem("Role")
  
  // console.log(email,role)

  const exit=()=>{
    logout({ returnTo: window.location.origin })
    localStorage.clear();
  }
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/Profilefind/${role}/${email}`)
    .then((res) => setid(res.data._id))
    .catch((err) => {
      console.log(err)
    })
    },[email,role])

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
          <Link to="/DesignPage"><div className={navcss.navicon} ><img src={design} alt="" className={navcss.design} /><p className={navcss.navtext}>Design</p></div></Link>
          <Link to="/ArchiProfile"><div className={navcss.navicon}><img src={archi} alt="" className={navcss.archi} /><p className={navcss.navtext}>Architect</p></div></Link>
        </div>
        <div className={navcss.nav}>
          <Link to={`/Profile/${role}/${id}`}><div className={navcss.navicon}><img src={profile} alt="" className={navcss.profile} /><p className={navcss.navtext}>Profile</p></div></Link>

          <div className={navcss.navicon} onClick={exit}><img src={logoutimg} alt="" className={navcss.logout} /><p className={navcss.navtext}>Log-Out</p></div>

        </div>
      </nav>
    </div>
  )
}

export default NavigationBar