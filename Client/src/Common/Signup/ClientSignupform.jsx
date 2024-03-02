import React from 'react'
import { useForm } from 'react-hook-form'
import form from "../../css/Signup.module.css"
import { Link } from 'react-router-dom'
import css from "../../css/Signup.module.css"
import clientimage from "../../../Assets/ClientFormImage.png"


function ClientSignupform() {
    const { register, handleSubmit, formState: { errors } } = useForm()


    return (
        <>
            <div className={css.clientcontent}>
                <div className={css.mainbody}>
                    <div className={css.clientform}>

                        <h1>Client</h1>

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
                            <Link to={"/ClientDetail"}><button type='submit' className={css.clientsubmit}>Signup</button></Link>
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