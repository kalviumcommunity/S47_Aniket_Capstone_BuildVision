import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import css from "../../css/Signup.module.css"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ClientLoginform from './ClientLoginform'
import architectimage from "../../../Assets/ArchitectFormImage.png"
import clientimage from "../../../Assets/ClientFormImage.png"
import google from "../../../Assets/GoogleLogo.png"
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

function Login() {
  const [toggle, setToggle] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const { user, loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const submit = (data) => {
    localStorage.setItem("Role", "Architect");
    localStorage.setItem("Email", data.email);
    axios.post("http://localhost:3000/ArchiLogin", data)
      .then((res) => {
        localStorage.setItem("Token", res.data.token)
        // alert(res.data.result)
        navigate("/DesignPage")

      })
      .catch((err) => {
        alert(err.response.data)
        console.log(err)
      })
  }

  useEffect(() => {
    const body = document.getElementsByClassName(css.container)[0]
    const archi = document.getElementsByClassName(css.archi)[0]
    const client = document.getElementsByClassName(css.client)[0]
    const archicontent = document.getElementsByClassName(css.archicontent)[0]
    const clientcontent = document.getElementsByClassName(css.clientcontent)[0]
    const archiHead = document.getElementsByClassName(css.archiHeading)[0]
    const clientHead = document.getElementsByClassName(css.clientHeading)[0]
    const mainarchiimage = document.getElementsByClassName(css.mainarchiimage)[0]
    const mainclientimage = document.getElementsByClassName(css.mainclientimage)[0]
    if (toggle != "") {
      mainclientimage.style.display = "none"
      mainarchiimage.style.display = "none"
    }

    if (toggle === "architect") {

      archi.style.width = "80vw"
      body.style.backgroundColor = "#335DB4"
      client.style.width = "20vw"
      archi.style.borderRadius = "0px 30px 30px 0px"
      client.style.borderRadius = "0px"
      archicontent.style.display = "block"
      clientcontent.style.display = "none"
      archiHead.style.display = "none"
      clientHead.style.display = "block"
    }
    else if (toggle === "client") {
      body.style.backgroundColor = "#00B3FF"
      archi.style.width = "20vw"
      client.style.width = "80vw"
      client.style.borderRadius = "30px 0px 0px 30px"
      archi.style.borderRadius = "0px"
      clientcontent.style.display = "block"
      archicontent.style.display = "none"
      clientHead.style.display = "none"
      archiHead.style.display = "block"
    }
    else {

    }
  }, [toggle])


  const storeTokenAndNavigate = async (token) => {
    console.log(token)
    localStorage.setItem("Token", token);
    localStorage.setItem("Role", "Architect");
    localStorage.setItem("Email", user.email);
    navigate("/DesignPage");
  }

  const handleLogin = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await storeTokenAndNavigate(accessToken);
    } catch (error) {
      console.error("Error occurred while fetching access token:", error);
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      handleLogin();
    }
  }, [isAuthenticated])


  return (
    <div className={css.container}>
      <div className={css.archi} onClick={() => setToggle("architect")}>
        <div className={css.archiHeading}>
          <div className={css.mainarchi}>
            <img src={architectimage} alt="" className={css.mainarchiimage} />
            <h1>Architecture</h1>
          </div>
        </div>
        <div className={css.archicontent}>
          <div className={css.mainbody}>
            <div>
              <img src={architectimage} alt="" className={css.archiimage} />
            </div>
            <div className={css.archiform}>
              <h1>Architecture</h1>
              <button className={css.googlebtn} onClick={() => loginWithRedirect()}><img src={google} alt="" className={css.google} /><h3 className={css.googletext}>Google</h3></button>
              <p>Dont have an account? <Link to={"/Signup"}>Sign up</Link></p>
              <form onSubmit={handleSubmit} className={css.form}>
                <div className={css.orbox}>
                  <div className={css.line}></div>
                  <p className={css.or}>OR</p>
                  <div className={css.line}></div>
                </div>
                <div className={css.formdiv}>
                  <label>Email</label>
                  <input type='email' {...register("email", { required: "Email is required" })} placeholder="Enter Email" />
                </div>
                {errors.email && <p className={css.alert}>{errors.email.message}</p>}
                <div className={css.formdiv}>
                  <label>Password</label>
                  <input type='password' {...register("password", { required: "Password is required" })} placeholder="Enter Password" />
                </div>
                {errors.password && <p className={css.alert}>{errors.password.message}</p>}
                <button type="submit" className={css.archisubmit} onClick={handleSubmit(submit)}>LogIn</button>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div className={css.client} onClick={() => setToggle("client")}>
        <div className={css.clientHeading}>
          <div className={css.mainclient}>
            <h1>Client</h1>
            <img src={clientimage} alt="" className={css.mainclientimage} />
          </div>
        </div>
        {<ClientLoginform />}
      </div>
    </div>
  )
}

export default Login