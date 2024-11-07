import React from 'react'
import css from "../../css/Forget.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import image from '../../../Assets/ClientNewPass.png'
import { useNavigate } from 'react-router-dom';

function ArchiChangePassword() {
        const { register, handleSubmit, formState: { errors } } = useForm();
        const navigate=useNavigate()
    
        const ChangePassword = (data) => {
            if(data.NewPassword==data.ConfirmPass){
                axios.put(`${import.meta.env.VITE_SERVER_URL}/Architectchangepassword`,{ headers: { "email": data.email ,"pass":data.NewPassword} })
                .then(()=>{
                    navigate('/login')
                })
            }
            else{
                alert("Password Doesn't Match")
            }
    
        }
    
    
        return (
            <div className={css.main}>
                <div className={css.form}>
                    <h1 className={css.heading}>Forget password</h1>
                    <div className={css.formbody}>
                        <div className={`${css.details} ${css.buttons}`}>
                            <label>New Password</label>
                            <input type='password' {...register("NewPassword", { required: "NewPassword is required" })} placeholder="Enter New Password" />
                            {errors.NewPassword && <p className={css.alert}>{errors.NewPassword.message}</p>}
                        </div>
                        <div className={`${css.details} ${css.buttons}`}>
                            <label>Confirm Password</label>
                            <input type='password' {...register("ConfirmPass", { required: "ConfirmPass is required" })} placeholder="Confirm Password" />
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

export default ArchiChangePassword