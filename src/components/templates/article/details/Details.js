"use client";

import Link from "next/link";
import DOMPurify from "dompurify";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import styles from "./details.module.css";

const Details = ({ title, body, shortDescription, creator, createdAt }) => {
  // 🧼 ضد XSS
  const cleanBody = DOMPurify.sanitize(body);

  return (
    <article className={styles.details}>
      {/* 🏷️ دسته */}
      <p className={styles.tag}>قهوه</p>

      {/* 📰 عنوان */}
      <h1 className={styles.title}>{title}</h1>

      {/* 👤 نویسنده */}
      <div className={styles.author}>
        <p>نویسنده</p>
        <img
          src={
            creator?.avatar ||
            "https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=64&d=mm&r=g"
          }
          alt={creator?.name || "نویسنده"}
        />
        <p>{creator?.name || "ناشناس"}</p>
      </div>

      {/* 🕒 تاریخ انتشار */}
      <div className={styles.date}>
        <span>{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
      </div>

      {/* 📝 خلاصه کوتاه */}
      <p className={styles.shortDescription}>{shortDescription}</p>

      {/* 🧾 بدنه مقاله (CKEditor HTML) */}
<div className={styles.article-body} dangerouslySetInnerHTML={{ __html: cleanBody }} />

      {/* 🔗 اشتراک‌گذاری در شبکه‌ها */}
      <div className={styles.contents}>
        <div className={styles.icons}>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </Link>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </Link>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <FaPinterest />
          </Link>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </Link>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </Link>
        </div>

        {/* 📖 ناوبری بین مقالات */}
        <div className={styles.more_articles}>
          <div className={styles.prev_article}>
            <Link href="/article/prev-id" className={styles.icon}>
              <FaAngleLeft />
            </Link>
            <div>
              <p>قدیمی‌تر</p>
              <Link href="/article/prev-id">مصرف قهوه با شیر برای کاهش التهاب</Link>
            </div>
          </div>

          <Link className={styles.link} href="/articles">
            <IoGridOutline />
          </Link>

          <div className={styles.next_article}>
            <Link href="/article/next-id" className={styles.icon}>
              <FaAngleRight />
            </Link>
            <div>
              <p>جدیدتر</p>
              <Link href="/article/next-id">کاهش افسردگی و اضطراب با قهوه</Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Details;
