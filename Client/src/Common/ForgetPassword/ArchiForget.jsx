import React, { useEffect } from 'react'
import css from "../../css/Forget.module.css"
import image from "../../../Assets/ClientForgetPassword.png"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ArchiForget() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [otp, setotp] = useState()
  const [otprecieved, setotprecieved] = useState("notrecieved")
  const navigate = useNavigate();

  const back = () => {
    navigate(-1)
  }

  const getotp = (data) => {
    console.log(data.email)
    axios.get(`${import.meta.env.VITE_SERVER_URL}/ArchitectForgetPass`, { headers: { "email": data.email } })
      .then((res) => {
        setotprecieved("recieved")
        setotp(res.data.otp)

      })
      .catch((err) => alert(err.response.data))
  }

  const verifyOTP = (data) => {
    if (data == otp) {
      navigate('/ArchitectChangePassword')
    } else {
      alert("Wrong OTP Entered")
      navigate("/login")
    }
  }
  return (
    <div className={css.main}>
      <div className={css.form}>
        <h1 className={css.heading}>Forget password</h1>
        <div className={css.formbody}>
          {otprecieved === "recieved" ?
            (<>
              <div className={`${css.details} ${css.buttons}`}>
                <label>Enter OTP</label>
                <input type='number' {...register("OTP", { required: "OTP is required" })} placeholder="Enter OTP" />
                {errors.OTP && <p className={css.alert}>{errors.OTP.message}</p>}
              </div>
              <div className={`${css.details} ${css.buttons}`}>
                <button onClick={back}>Back</button>
                {<button onClick={handleSubmit(verifyOTP)}>Verify</button>}

              </div>
            </>)
            :
            (<>
              <div className={`${css.email} ${css.buttons}`}>
                <label>Enter your Email</label>
                <input type='email' {...register("email", { required: "Email is required" })} placeholder="Enter Email" />
                {errors.email && <p className={css.alert}>{errors.email.message}</p>}
              </div>
              <div className={`${css.details} ${css.buttons}`}>
                <button onClick={back}>Back</button>
                {<button onClick={handleSubmit(getotp)}>Get OTP</button>}

              </div>
            </>)
          }
        </div>
      </div>
      <img src={image} alt="" className={css.image} />
    </div>
  )
}

export default ArchiForget