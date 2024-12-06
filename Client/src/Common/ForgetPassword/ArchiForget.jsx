import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../../Assets/ClientForgetPassword.png";
import css from "../../css/ForgetPass.module.css";

function ArchiForget() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [otp, setOtp] = useState("");
  const [otpReceived, setOtpReceived] = useState(false);
  const navigate = useNavigate();

  const back = () => navigate(-1);

  const getOtp = (data) => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/ArchitectForgetPass`, { headers: { email: data.email } })
      .then((res) => {
        setOtp(res.data.otp);
        setOtpReceived(true);
        alert("OTP sent to your email!");
      })
      .catch((err) => alert(err.response.data));
  };

  const verifyOtp = (data) => {
    if (data.OTP === otp) {
      alert("OTP verified successfully!");
      navigate("/ArchitectChangePassword");
    } else {
      alert("Wrong OTP entered!");
    }
  };

  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1 className={css.heading}>Forgot Password</h1>
        <form onSubmit={otpReceived ? handleSubmit(verifyOtp) : handleSubmit(getOtp)} className={css.form}>
          {otpReceived ? (
            <>
              <div className={css.inputGroup}>
                <label htmlFor="otp">Enter OTP</label>
                <input
                  id="otp"
                  type="number"
                  {...register("OTP", { required: "OTP is required" })}
                  placeholder="Enter OTP"
                />
                {errors.OTP && <p className={css.errorText}>{errors.OTP.message}</p>}
              </div>
              <div className={css.buttons}>
                <button type="button" className={css.backButton} onClick={back}>Back</button>
                <button type="submit" className={css.submitButton}>Verify</button>
              </div>
            </>
          ) : (
            <>
              <div className={css.inputGroup}>
                <label htmlFor="email">Enter Your Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                />
                {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
              </div>
              <div className={css.buttons}>
                <button type="button" className={css.backButton} onClick={back}>Back</button>
                <button type="submit" className={css.submitButton}>Get OTP</button>
              </div>
            </>
          )}
        </form>
      </div>
      <div className={css.imageContainer}>
        <img src={image} alt="Forget Password" className={css.image} />
      </div>
    </div>
  );
}

export default ArchiForget;
