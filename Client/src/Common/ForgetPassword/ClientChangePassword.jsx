import React, { useState } from 'react'
import css from "../../css/Forget.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import image from '../../../Assets/ClientNewPass.png'
import { useNavigate } from 'react-router-dom';

function ClientChangePassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate=useNavigate()

    const ChangePassword = (data) => {
        if(data.NewPassword==data.ConfirmPass){
            axios.put(`${import.meta.env.VITE_SERVER_URL}/Clientchangepassword`,{ "email": data.email ,"pass":data.NewPassword })
            .then(()=>{
                navigate('/login')
            }).catch((err)=>{
                console.log(err)
            })
        }
        else{
            alert("Password Doesn't Match")
        }

    }


    return (
        <div className={css.main}>
            <div className={css.form}>
                <h1 className={css.heading}>New password</h1>
                <div className={css.formbody}>
                    <div className={`${css.details} ${css.buttons}`}>
                        <label>Enter Email</label>
                        <input type='email' {...register("email")} placeholder="Enter Email" />
                        {errors.email && <p className={css.alert}>{errors.email.message}</p>}
                    </div>
                    <div className={`${css.details} ${css.buttons}`}>
                        <label>New Password</label>
                        <input type='password' {...register("NewPassword")} placeholder="Enter New Password" />
                        {errors.NewPassword && <p className={css.alert}>{errors.NewPassword.message}</p>}
                    </div>
                    <div className={`${css.details} ${css.buttons}`}>
                        <label>Confirm Password</label>
                        <input type='password' {...register("ConfirmPass")} placeholder="Confirm Password" />
                        {errors.ConfirmPass && <p className={css.alert}>{errors.ConfirmPass.message}</p>}
                    </div>
                    <div className={`${css.details} ${css.buttons}`}>
                        {<button onClick={handleSubmit(ChangePassword)}>Change Password</button>}

                    </div>
                </div>
            </div>
            <img src={image} alt="" className={css.image} />
        </div>
    )
}

export default ClientChangePassword