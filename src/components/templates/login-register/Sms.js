"use client";
import { useState } from "react";
import styles from "./sms.module.css";
import { showSwal } from "@/utils/Helpers";
import { useRouter } from "next/navigation";

const Sms = ({ cancelSendOtp, phone, name, email }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleVerifyCode = async () => {
    // ولیدیشن
    if (!code) {
      showSwal("لطفاً کد تأیید را وارد کنید", "error", "باشه");
      return;
    }
    if (!/^\d{5,6}$/.test(code)) {
      showSwal("کد تأیید باید عددی و ۵ یا ۶ رقمی باشد", "error", "باشه");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/sms/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, phone, email, name }),
      });

      const data = await res.json();

      // ✅ بررسی status code
      switch (res.status) {
        case 200:
          swal({
            title: data.message || "کد تأیید با موفقیت انجام شد",
            icon: "success",
            buttons: "ادامه",
          }).then(() => {
            router.replace("/p-user");
          });
          break;
        case 401:
          showSwal(data.message || "کد اشتباه است", "error", "باشه");
          break;
        case 404:
          showSwal(data.message || "کد تأیید یافت نشد", "error", "باشه");
          break;
        case 410:
          showSwal(
            data.message || "کد منقضی شده است. لطفاً دوباره درخواست دهید",
            "error",
            "باشه"
          );
          break;
        case 429:
          showSwal(
            data.message || "تعداد تلاش‌های شما به پایان رسیده است",
            "error",
            "باشه"
          );
          break;
        default:
          showSwal(data.message || "خطایی رخ داده است", "error", "باشه");
      }
    } catch (err) {
      console.error("Verify error:", err);
      showSwal("خطا در برقراری ارتباط با سرور", "error", "تلاش مجدد");
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
};

export default Sms;
