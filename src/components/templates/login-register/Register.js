"use client";
import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";

const Register = () => {
  const [isRegisterWithPassword, setIsRegisterWithPassword] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
    const cancelSendOtp=()=>{
    setIsRegisterWithOtp(false)
  }
  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input className={styles.input} type="text" placeholder="نام" />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {isRegisterWithPassword && (
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />
            )}
            <p
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithOtp(true)}
            >
              ثبت نام با کد تایید
            </p>
            <button
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithPassword(true)}
            >
              ثبت نام با رمزعبور
            </button>
            <p className={styles.back_to_login}>برگشت به ورود</p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <>
          <Sms cancelSendOtp={cancelSendOtp}/>
        </>
      )}
    </>
  );
};

export default Register;
