import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import css from "../../css/Signup.module.css"
import clientimage from "../../../Assets/ClientFormImage.png"
import axios from 'axios'
import google from "../../../Assets/GoogleLogo.png"
import { useAuth0 } from '@auth0/auth0-react'


function ClientSignupform() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { user, loginWithRedirect } = useAuth0();
    const navigate = useNavigate()

    useEffect(() => {
        const formdata = async () => {
            if (user) {
                await axios.post("http://localhost:3000/ClientSignUp", {
                    ClientEmail: user.email,
                    ClientName: user.nickname,
                    ImageOfClient: user.picture,
                    Role: "Client"
                })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            }
        }
        formdata()
    }, [user])

    const onSubmit = (data) => {

        const formdata = new FormData();
        formdata.append("ImageOfClient", data.ImageOfClient[0])
        formdata.append("ClientName", data.name)
        formdata.append("ClientEmail", data.email)
        formdata.append("ClientPassword", data.password)
        formdata.append("Role", "Client")
        const fdata = async () => {
            // if(data){
            await axios.post("http://localhost:3000/ClientSignUp", formdata)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))


            navigate("/DesignPage")
            // }
        }
        fdata()
    }

    document.cookie="role=Client"
    return (
        <>
            <div className={css.clientcontent}>
                <div className={css.mainbody}>
                    <div className={css.clientform}>

                        <h1>Client</h1>

                        <button className={css.googlebtn} onClick={() => loginWithRedirect()}><img src={google} alt="" className={css.google} /><h3 className={css.googletext}>Google</h3></button>


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
                                <input type='file' {...register("ImageOfClient", { required: "Image is required" })} />
                            </div>
                            {errors.image && <p className={css.alert}>{errors.image.message}</p>}
                           <button onClick={handleSubmit(onSubmit)} className={css.clientsubmit}>Signup</button>
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