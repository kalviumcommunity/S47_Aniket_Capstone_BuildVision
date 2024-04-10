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

    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate()

    console.log(user)
    console.log(isAuthenticated)

    // console.log('Token',getAccessTokenSilently().then(res=>res));
    if (isAuthenticated) {
        localStorage.setItem("Role", "Client")
        localStorage.setItem("Email", user.email)
        const formdata=new FormData();

        formdata.append("ClientEmail", user.email)
        formdata.append("ClientName", user.name)
        formdata.append("ImageOfClient", user.picture)
        formdata.append("Role", "Client");
        formdata.append("BirthYear", "0");
        formdata.append("ClientPhoneNumber", "0");
        axios.post("http://localhost:3000/ClientSignUp", formdata)
            .then((res) => {
                // alert(res.data.result)
            })
            .catch((err) => alert(err.response))
        formdata.forEach((value, key) => {
            console.log(key, value)
        })
    }

    const onSubmit = (data) => {
        // document.cookie="Role=Client"
        // document.cookie=`Email=${data.email || user.email}`

        localStorage.setItem("Role", "Client");

        localStorage.setItem("Email", data.ClientEmail);


        console.log(data)
        const formData = new FormData();

        formData.append("ClientEmail", data.ClientEmail )
        formData.append("ClientName", data.ClientName);
        formData.append("ClientPassword", data.ClientPassword);
        formData.append("Role", "Client");
        formData.append("D.O.B", ISODate(""));
        formData.append("ClientPhoneNumber", "0");
        formData.append("ImageOfClient", data.ImageOfClient[0]);

        console.log(data);
        console.log(formData);

        const fdata = async () => {
            // if(data){
            axios.post("http://localhost:3000/ClientSignUp", formData)
                .then((res) => {
                    // alert(res.data.result)
                    localStorage.setItem("Token", res.data.token)

                    // navigate("/DesignPage")
                    window.location.reload()
                })

                .catch((err) => alert(err.response))

            // }
        }
        fdata()
    }


    return (
        <>
            <div className={css.clientcontent}>
                <div className={css.mainbody}>
                    <div className={css.clientform}>

                        <h1>Client</h1>

                        <button className={css.googlebtn} onClick={() => loginWithRedirect({ authorizationParams: { 'screen_hint': 'signup' }})}><img src={google} alt="" className={css.google} /><h3 className={css.googletext}>Google</h3></button>


                        <p>Already have an account? <Link to={"/Login"}>Log In</Link></p>
                        <form className={css.form} method="post" encType="multipart/form-data">
                            <div className={css.orbox}>
                                <div className={css.line}></div>
                                <p className={css.or}>OR</p>
                                <div className={css.line}></div>
                            </div>

                            <div className={css.formdiv}>
                                <label>Name</label>
                                <input type='text' {...register("ClientName", { required: "Name is required" })} placeholder="Enter Name" />
                            </div>
                            <div className={css.formdiv}>
                                <label>Email</label>
                                <input type='email' {...register("ClientEmail", { required: "Email is required" })} placeholder="Enter Email" />
                            </div>
                            {errors.ClientEmail && <p className={css.alert}>{errors.ClientEmail.message}</p>}
                            <div className={css.formdiv}>
                                <label>Password</label>
                                <input type='password' {...register("ClientPassword", { required: "Password is required" })} placeholder="Enter Password" />
                            </div>
                            {errors.ClientPassword && <p className={css.alert}>{errors.ClientPassword.message}</p>}
                            <div>
                                <label>Image</label>
                                <input type='file' {...register("ImageOfClient")} />
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