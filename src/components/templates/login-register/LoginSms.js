"use client";
import { useState } from "react";
import styles from "./sms.module.css";
import { showSwal } from "@/utils/Helpers";
import { useRouter } from "next/navigation";
export default function LoginSms({ cancelSendOtp, phone }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
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
          //   onClick={handleVerifyCode}
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
