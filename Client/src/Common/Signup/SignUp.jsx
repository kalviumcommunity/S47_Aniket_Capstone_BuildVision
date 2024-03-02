import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import css from "../../css/Signup.module.css"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ClientSignupform from './ClientSignupform'
import architectimage from "../../../Assets/ArchitectFormImage.png"
function SignUp() {
  const [toggle, setToggle] = useState("client")
  const { register, handleSubmit, formState: { errors } } = useForm();



  useEffect(() => {
    const body = document.getElementsByTagName("body")[0]
    const archi = document.getElementsByClassName(css.archi)[0]
    const client = document.getElementsByClassName(css.client)[0]
    const archicontent = document.getElementsByClassName(css.archicontent)[0]
    const clientcontent = document.getElementsByClassName(css.clientcontent)[0]
    const archiHead = document.getElementsByClassName(css.archiHeading)[0]
    const clientHead = document.getElementsByClassName(css.clientHeading)[0]

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

  return (
    <div className={css.container}>
      <div className={css.archi} onClick={() => setToggle("architect")}>
        <h1 className={css.archiHeading}>Architecture</h1>
        <div className={css.archicontent}>
          <div className={css.mainbody}>
            <div>
              <img src={architectimage} alt="" className={css.archiimage} />
            </div>
            <div className={css.archiform}>
              <h1>Architecture</h1>
              <button>Google</button>
              <p>Already have an account? <Link>Log In</Link></p>
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
                <Link to={"/ArchitectureDetail"}><button type='submit' className={css.archisubmit}>Signup</button></Link>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div className={css.client} onClick={() => setToggle("client")}>
        <h1 className={css.clientHeading}>Client</h1>
        {<ClientSignupform />}
      </div>
    </div>
  )
}

export default SignUp