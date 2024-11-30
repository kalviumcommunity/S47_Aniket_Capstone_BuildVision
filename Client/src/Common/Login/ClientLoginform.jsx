import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import css from "../../css/Signup.module.css"
import clientimage from "../../../Assets/ClientFormImage.png"
import google from "../../../Assets/GoogleLogo.png"
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'


function ClientLoginform() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const { loginWithRedirect,} = useAuth0();

    const submit = (data) => {

        axios.post(`${import.meta.env.VITE_SERVER_URL}/ClientLogin`, data)
        .then((res) => {
                localStorage.setItem("Role", "Client");
                localStorage.setItem("Email", data.email);
                localStorage.setItem("Token", res.data.token)
                localStorage.setItem("userid", res.data.id)
                alert(res.data.result)
                navigate("/DesignPage")

            })
            .catch((err) => alert(err.response.data))
    }

    async function handleLoginWithRedirect(){
        localStorage.setItem("Role", "Client");
        await loginWithRedirect()
    }
    

    return (
        <>
            <div className={css.clientcontent}>
                <div className={css.mainbody}>
                    <div className={css.clientform}>

                        <h1>Client</h1>

                        <button className={css.googlebtn} onClick={handleLoginWithRedirect}><img src={google} alt="" className={css.google} /><h3 className={css.googletext}>Google</h3></button>

                        <p>Dont have an account? <Link to={"/Signup"}>Signup</Link></p>
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
                            <Link to={'/ClientForgetPass'} className={css.forgetpass}>Forget Password?</Link>
                            <button type='submit' className={css.clientsubmit} onClick={handleSubmit(submit)}>LogIn</button>
                        </form>
                    </div>
                    <div>
                        <img src={clientimage} alt="" className={css.clientimage} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientLoginform