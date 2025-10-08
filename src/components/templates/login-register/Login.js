import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";

import { valiadteEmail, valiadtePassword } from "@/utils/auth";
import { showSwal } from "@/utils/Helpers";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import LoginSms from "./LoginSms";
const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const cancelSendOtp = () => setIsLoginWithOtp(false);

  // login with password
  const loginWithPassword = async () => {
    if (!phoneOrEmail) {
      return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "چشم");
    }

    // چک کنیم اگر ورودی ایمیل بود → اعتبارسنجی ایمیل
    if (phoneOrEmail.includes("@")) {
      const isValidEmail = valiadteEmail(phoneOrEmail);
      if (!isValidEmail) {
        return showSwal("ایمیل وارد شده صحیح نیست", "error", "تلاش مجدد");
      }
    }

    if (!password) {
      return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
    }

    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد به اندازه کافی قوی نیست", "error", "تلاش مجدد");
    }

    const user = { email: phoneOrEmail, password };

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.status === 201) {
        swal({
          title: "با موفقیت لاگین شدین",
          icon: "success",
          button: "ورود به پنل کاربری",
        }).then(() => {
          router.replace("/p-user");
          router.refresh();
        });
        // ریست کردن ورودی‌ها بعد از موفقیت
        setPhoneOrEmail("");
        setPassword("");
      } else if (res.status === 422 || res.status === 401) {
        showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش مجدد");
      } else if (res.status === 419) {
        showSwal("ایمیل یا پسورد صحیح نیست", "error", "تلاش مجدد");
      } else {
        showSwal("خطایی رخ داد", "error", "تلاش مجدد");
      }
    } catch (error) {
      console.error(error);
      showSwal("مشکلی پیش آمد", "error", "تلاش مجدد");
    } finally {
      setIsSubmitting(false);
    }
  };
  //لاگین با رمز یکبارمصرف
  const handleLoginWithOtp = async () => {
    const isValidPhone = /^09\d{9}$/.test(phoneOrEmail);

    // اگر شماره موبایل معتبر نبود
    if (!isValidPhone) {
      return showSwal("شماره موبایل وارد شده معتبر نیست", "error", "تلاش مجدد");
    }

    try {
      setIsSubmitting(true);

      // ارسال درخواست به API ارسال OTP
      const res = await fetch("/api/auth/sms/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneOrEmail }),
      });

      const data = await res.json();

      // بررسی وضعیت پاسخ
      if (res.status === 200) {
        showSwal(data.message || "کد تایید ارسال شد", "success", "باشه");
        setIsLoginWithOtp(true);
      } else if (res.status === 404) {
        showSwal("کاربری با این شماره یافت نشد", "error", "باشه");
      } else if (res.status === 429) {
        showSwal(data.message || "درخواست بیش از حد مجاز", "warning", "باشه");
      } else {
        showSwal(
          data.message || "ارسال کد با خطا مواجه شد",
          "error",
          "تلاش مجدد"
        );
      }
    } catch (error) {
      console.error("OTP Error:", error);
      showSwal("مشکلی در ارسال کد پیش آمد", "error", "تلاش مجدد");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={phoneOrEmail}
              onChange={(event) => setPhoneOrEmail(event.target.value)}
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button
              className={styles.btn}
              onClick={loginWithPassword}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ورود..." : "ورود"}
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={handleLoginWithOtp}
              className={styles.btn}
              disabled={isSubmitting}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <LoginSms cancelSendOtp={cancelSendOtp} phone={phoneOrEmail} />
      )}
    </>
  );
};

export default Login;
