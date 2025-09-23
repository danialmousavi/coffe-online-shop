import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { showSwal } from "@/utils/Helpers";

const CommentForm = ({ productID }) => {
  const [body, setBody] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0); // <-- عددی شروع می‌کنیم
  const [submitting, setSubmitting] = useState(false);

  const handleSetComment = async (e) => {
    e?.preventDefault?.();
    // ساده‌ترین اعتبارسنجی سمت کلاینت
    if (!body || !username || !email) {
      showSwal(".لطفاً فیلدهای ضروری را پر کنید","warning","متوجه شدم");
      return;
    }

    const comment = { username, body, email, score, productID };

    try {
      setSubmitting(true);
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });

      if (!res.ok) {
        throw new Error(`خطا از سرور: ${res.status}`);
      }

      const data = await res.json().catch(() => null);
      console.log("ثبت شد:", data);

      // ریست فرم (در صورت نیاز)
      setBody("");
      setUsername("");
      setEmail("");
      setScore(0);
      showSwal("دیدگاه شما ثبت شد.","success","متوجه شدم");
    } catch (err) {
      console.error(err);
      showSwal("خطا هنگام ارسال دیدگاه: ",err.message||err,"متوجه شدم");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSetComment}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span className={styles.required}>*</span>
      </p>

<div className={styles.rate}>
  <p>امتیاز شما :</p>
  <div>
    {[1, 2, 3, 4, 5].map((s) => (
      <IoMdStar
        key={s}
        onClick={() => setScore(s)}
        style={{ color: score >= s ? "orange" : "gray", cursor: "pointer" }}
      />
    ))}
  </div>
</div>

      <div className={styles.group}>
        <label htmlFor="comment">
          دیدگاه شما <span className={styles.required}>*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="username">
            نام <span className={styles.required}>*</span>
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="email">
            ایمیل <span className={styles.required}>*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.checkbox}>
        <input id="saveInfo" type="checkbox" />
        <label htmlFor="saveInfo">
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </label>
      </div>

      <button className={styles.submit} type="submit" disabled={submitting}>
        {submitting ? "در حال ارسال..." : "ثبت"}
      </button>
    </form>
  );
};

export default CommentForm;
