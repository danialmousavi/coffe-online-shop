"use client";
import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/Helpers";
import { valiadteEmail, valiadtePassword, valiadtePhone } from "@/utils/auth";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPassword, setIsRegisterWithPassword] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cancelSendOtp = () => {
    setIsRegisterWithOtp(false);
  };

  // تابع ولیدیشن
  const validateInputs = () => {
    if (!name.trim()) {
      showSwal("نام را وارد کنید", "error", "تلاش مجدد");
      return false;
    }

    const isValidPhone = valiadtePhone(phone);
    if (!isValidPhone) {
      showSwal("شماره تماس معتبر نیست", "error", "تلاش مجدد");
      return false;
    }

    if (email) {
      const isValidEmail = valiadteEmail(email);
      if (!isValidEmail) {
        showSwal("ایمیل معتبر نیست", "error", "تلاش مجدد");
        return false;
      }
    }

    if (isRegisterWithPassword) {
      const isValidPassword = valiadtePassword(password);
      if (!isValidPassword) {
        showSwal("رمز عبور بهتری وارد کنید", "error", "تلاش مجدد");
        return false;
      }
    }

    return true;
  };

  // ثبت نام
  const signup = async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true); // دکمه غیرفعال بشه

    const user = { name, email, phone, password };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        showSwal("خطا در ثبت نام", "error", "تلاش مجدد");
      } else {
        showSwal("ثبت نام موفقیت‌آمیز بود", "success", "ادامه");

        // ریست کردن فیلدها
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setIsRegisterWithPassword(false);
      }
    } catch (error) {
      console.error(error);
      showSwal("مشکلی پیش آمد", "error", "تلاش مجدد");
    } finally {
      setIsSubmitting(false); // دوباره فعال کردن دکمه
    }
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="نام"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {isRegisterWithPassword && (
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
              onClick={() => {
                if (isRegisterWithPassword) {
                  signup();
                } else {
                  setIsRegisterWithPassword(true);
                }
              }}
              disabled={isSubmitting} // دکمه غیرفعال میشه
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت نام با رمزعبور"}
            </button>
            <p className={styles.back_to_login}>برگشت به ورود</p>
          </div>
          <p className={styles.redirect_to_home} onClick={showloginForm}>
            لغو
          </p>
        </>
      ) : (
        <Sms cancelSendOtp={cancelSendOtp} />
      )}
    </>
  );
};

export default Register;
