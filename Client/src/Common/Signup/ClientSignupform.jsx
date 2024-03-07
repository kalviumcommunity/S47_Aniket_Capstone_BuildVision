import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import css from "../../css/Signup.module.css"
import clientimage from "../../../Assets/ClientFormImage.png"
import axios from 'axios'
import google from "../../../Assets/GoogleLogo.png"
import { useAuth0 } from '@auth0/auth0-react'


function ClientSignupform() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { user, loginWithRedirect } = useAuth0();
    console.log(user)

    useEffect(() => {
        const formdata = async () => {
            await axios.post("http://localhost:3000/ClientSignUp", {
                ClientEmail: user.email,
                ClientName: user.nickname,
                ImageOfClient: user.picture
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
        formdata()
    }, [user])

    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3000/ClientSignUp", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className={css.clientcontent}>
                <div className={css.mainbody}>
                    <div className={css.clientform}>

                        <h1>Client</h1>

                        <button className={css.googlebtn} onClick={() => loginWithRedirect()}><img src={google} alt="" className={css.google} /><h3 className={css.googletext}>Google</h3></button>


                        <p>Already have an account? <Link to={"/Login"}>Log In</Link></p>
                        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                            <div className={css.orbox}>
                                <div className={css.line}></div>
                                <p className={css.or}>OR</p>
                                <div className={css.line}></div>
                            </div>
                            <div className={css.formdiv}>
                                <label>Name</label>
                                <input type='text' {...register("name", { required: "Name is required" })} placeholder="Enter Name" />
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
                            <Link to={"/DesignPage"}><button type='submit' className={css.clientsubmit}>Signup</button></Link>
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

export default ClientSignupform