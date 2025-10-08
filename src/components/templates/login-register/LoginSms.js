"use client";
import { useState } from "react";
import styles from "./sms.module.css";
import { showSwal } from "@/utils/Helpers";
import { useRouter } from "next/navigation";

export default function LoginSms({ cancelSendOtp, phone }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerifyCode = async () => {
    // بررسی اولیه
    if (!code || code.length < 4) {
      return showSwal("لطفاً کد تأیید را به‌درستی وارد کنید", "error", "باشه");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/sms/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const data = await res.json();

      // بررسی وضعیت پاسخ
      if (res.status === 200) {
        swal({
            title:"ورود با موفقیت انجام شد",
            icon:"success",
            buttons:"ادامه"
        }).then(()=>{
          router.replace("/p-user");
          router.refresh();
        })
      } else if (res.status === 410) {
        showSwal("کد منقضی شده است. لطفاً مجدداً تلاش کنید", "warning", "باشه");
      } else if (res.status === 409) {
        showSwal("کد وارد شده اشتباه است", "error", "تلاش مجدد");
      } else if (res.status === 404) {
        showSwal("کاربری با این شماره یافت نشد", "error", "تلاش مجدد");
      } else {
        showSwal(data.message || "خطایی رخ داده است", "error", "باشه");
      }
    } catch (error) {
      console.error("Verify Error:", error);
      showSwal("مشکلی در ارتباط با سرور پیش آمد", "error", "باشه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <p>کد تایید</p>
        <span className={styles.code_title}>
          لطفاً کد تأیید ارسال شده را تایپ کنید
        </span>
        <span className={styles.number}>{phone}</span>

        <input
          className={styles.input}
          type="text"
          maxLength={6}
          inputMode="numeric"
          pattern="[0-9]*"
          value={code}
          disabled={loading}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="کد تأیید را وارد کنید"
        />

        <button
          style={{ marginTop: "1rem" }}
          className={styles.btn}
          onClick={handleVerifyCode}
          disabled={loading}
        >
          {loading ? "در حال بررسی..." : "ثبت کد تایید"}
        </button>

        <p className={styles.send_again_code}>ارسال مجدد کد یکبار مصرف</p>
      </div>

      <p className={styles.redirect_to_home} onClick={cancelSendOtp}>
        لغو
      </p>
    </>
  );
}
