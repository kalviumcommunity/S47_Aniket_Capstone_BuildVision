import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import css from "../../css/Signup.module.css"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ClientSignupform from './ClientSignupform'
import architectimage from "../../../Assets/ArchitectFormImage.png"
import clientimage from "../../../Assets/ClientFormImage.png"
import axios from 'axios'
import google from "../../../Assets/GoogleLogo.png"
import { useAuth0 } from '@auth0/auth0-react'

function SignUp() {
  const [toggle, setToggle] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();


  const { user, loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate()

  // console.log(image)
  if(isAuthenticated){
    // document.cookie=`Role=${Architect}; expires=Thu, 01 Jan 9999 23:59:59 GMT`
    // document.cookie=`Email=${data.email || user1.email}; expires=Thu, 01 Jan 9999 00:00:00 UTC;`
    localStorage.setItem("Role", "Architect")
    localStorage.setItem("Email", user.email)
    const formdata = new FormData();
    formdata.append("ImageOfArchitect", user.picture)
    formdata.append("ArchitectName", user.name)
    formdata.append("ArchiEmail", user.email)
    formdata.append("Role", "Architect")
    formdata.append("NoOfProjects", "0")
    formdata.append("YearOfExperience", "0")
    formdata.append("ArchiPhoneNumber", "0")

    console.log(formdata)
    const fdata = async () => {
      // if(data){
      await axios.post("http://localhost:3000/ArchiSignUp", formdata)
        .then((res) => {
          alert(res.data.result)
          navigate("/DesignPage")
          window.location.reload()
        })
        // .catch((err) => alert(err.response.data.message))

      // }
    }
    fdata()
  }
  const onSubmit = (data) => {
    // document.cookie=`Role=${Architect}; expires=Thu, 01 Jan 9999 23:59:59 GMT`
    // document.cookie=`Email=${data.email || user1.email}; expires=Thu, 01 Jan 9999 00:00:00 UTC;`
    localStorage.setItem("Role", "Architect")
    localStorage.setItem("Email", data.email)

    const formdata = new FormData();
    formdata.append("ImageOfArchitect", data.ImageOfArchitect[0] || "")
    formdata.append("ArchitectName", data.name)
    formdata.append("ArchiEmail", data.email)
    formdata.append("ArchiPassword", data.password)
    formdata.append("Role", "Architect")
    formdata.append("NoOfProjects", "0")
    formdata.append("YearOfExperience", "0")
    formdata.append("ArchiPhoneNumber", "0")
    const fdata = async () => {
      // if(data){
      await axios.post("http://localhost:3000/ArchiSignUp", formdata)
        .then((res) => {
          alert(res.data.result)
          localStorage.setItem("Token", res.data.token)
          navigate("/DesignPage")
          window.location.reload()
        })
        .catch((err) => alert(err.response.data.message))

      // }
    }
    fdata()
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


  const token = async () => {
    const res = await getAccessTokenSilently()
    console.log("Token", res)
  }


  if (isAuthenticated) {
    token()
    navigate("/DesignPage")
  }

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
              <button className={css.googlebtn} onClick={() => loginWithRedirect({ authorizationParams: { 'screen_hint': 'signup' } })}><img src={google} alt="" className={css.google} /><h3 className={css.googletext}>Google</h3></button>

              <p>Already have an account? <Link to={"/Login"}>Log In</Link></p>
              <form className={css.form} method="post" encType="multipart/form-data">
                <div className={css.orbox}>
                  <div className={css.line}></div>
                  <p className={css.or}>OR</p>
                  <div className={css.line}></div>
                </div>
                <div className={css.formdiv}>
                  <label>Name</label>
                  <input type='text' {...register("name", { required: "Name is required" })} placeholder="Enter Name" />
                </div>
                {errors.name && <p className={css.alert}>{errors.name.message}</p>}
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
                <div>
                  <label>Image</label>
                  <input type='file' {...register("ImageOfArchitect")} />
                </div>
                {errors.image && <p className={css.alert}>{errors.image.message}</p>}
                <button onClick={handleSubmit(onSubmit)} className={css.archisubmit}>Signup</button>
              </form>
              <img src={register.image} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={css.client} onClick={() => setToggle("client")}>
        <div className={css.clientHeading}>
          <div className={css.mainclient}>
            <img src={clientimage} alt="" className={css.mainclientimage} />
            <h1>Client</h1>
          </div>
        </div>
        {<ClientSignupform />}
      </div>
    </div>
  )
}

export default SignUp