import React from 'react'
import { Link } from 'react-router-dom'
import css from "../css/homepage.module.css"
import logo from "../../Assets/Logo.png"
import img from "../../Assets/HomeImage.png"

function Homepage() {
  return (
    <div className={css.container}>
        <div className={css.left}>
            <img src={logo} alt="" className={css.logo}/>
            <img src={img} alt="" className={css.img}/>
        </div>
        <div className={css.left}>
            <h1 className={css.intro}>Introduction</h1>
            <p className={css.pera}>Welcome to Build Vision, your all-in-one solution for architecture enthusiasts! Whether you're an aspiring architect, a professional designer, or someone who simply appreciates beautiful buildings, our app has something for you. <br />
Explore a wide range of architectural marvels from around the world, discover the latest trends in design, and connect with like-minded individuals in our vibrant community. From iconic landmarks to cutting-edge innovations, immerse yourself in the fascinating world of architecture like never before. <br />
Join us on this journey as we celebrate the creativity, ingenuity, and passion behind the structures that shape our world. Let's build something extraordinary together. Welcome to Build vision.</p>
            <Link to="/SignUp"><button className={css.LogInBtn}>Log In</button></Link>
        </div>
    </div>
  )
}

export default Homepage