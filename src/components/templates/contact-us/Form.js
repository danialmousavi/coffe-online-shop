"use client";
import { useState } from "react";
import styles from "./form.module.css";
import { showSwal } from "@/utils/Helpers";

const Form = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    if (!name || name.trim().length < 3) {
      showSwal("نام باید حداقل ۳ کاراکتر باشد", "error","تایید");
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showSwal("ایمیل معتبر نیست", "error","تایید");
      return false;
    }
    if (phone && !/^[0-9+\-\s]{7,15}$/.test(phone)) {
      showSwal( "شماره تلفن معتبر نیست", "error","تایید");
      return false;
    }
    if (!message || message.trim().length < 5) {
      showSwal( "پیام باید حداقل ۵ کاراکتر باشد", "error","تایید");
      return false;
    }
    return true;
  };

  const submitMessage = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const contact = {
      name,
      email,
      company,
      phone,
      message,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (res.status === 201) {
      showSwal("پیام شما با موفقیت ارسال شد", "success", "تایید");

      // پاک کردن فرم بعد از موفقیت
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setMessage("");
    } else {
      const data = await res.json();
      showSwal("خطا", "warning", "تایید");
    }
  };

  return (
    <form className={styles.form} onSubmit={submitMessage}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          cols="30"
          rows="3"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
      </div>
      <button type="submit">ارسال</button>
    </form>
  );
};

export default Form;
