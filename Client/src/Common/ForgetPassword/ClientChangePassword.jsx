import React from "react";
import css from "../../css/ChangePass.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import image from "../../../Assets/ClientNewPass.png";
import { useNavigate } from "react-router-dom";

function ClientChangePassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const ChangePassword = (data) => {
    if (data.NewPassword === data.ConfirmPass) {
      axios
        .put(`${import.meta.env.VITE_SERVER_URL}/Clientchangepassword`, {
          headers: { email: data.email, pass: data.NewPassword },
        })
        .then(() => {
          navigate("/login");
        });
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1 className={css.heading}>Reset Your Password</h1>
        <form onSubmit={handleSubmit(ChangePassword)} className={css.form}>
          <div className={css.inputGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              {...register("NewPassword", { required: "New Password is required" })}
              placeholder="Enter new password"
              className={errors.NewPassword ? css.errorInput : ""}
            />
            {errors.NewPassword && <p className={css.errorText}>{errors.NewPassword.message}</p>}
          </div>
          <div className={css.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register("ConfirmPass", { required: "Confirm Password is required" })}
              placeholder="Confirm new password"
              className={errors.ConfirmPass ? css.errorInput : ""}
            />
            {errors.ConfirmPass && <p className={css.errorText}>{errors.ConfirmPass.message}</p>}
          </div>
          <button type="submit" className={css.submitButton}>
            Change Password
          </button>
        </form>
      </div>
      <div className={css.imageContainer}>
        <img src={image} alt="Reset Password Illustration" className={css.image} />
      </div>
    </div>
  );
}

export default ClientChangePassword;
