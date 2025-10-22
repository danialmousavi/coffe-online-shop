import { MdOutlineSms } from "react-icons/md";
import styles from "./article.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

const Card = ({title,creator,createdAt,_id}) => {
  return (
    <div className={styles.card}>
      <Link className={styles.img_container} href={"/article/123"}>
        <img
          src="https://set-coffee.com/wp-content/uploads/elementor/thumbs/-%D9%82%D9%87%D9%88%D9%87-%D8%A8%D8%A7-%D8%B4%DB%8C%D8%B1-qi8xuncj4ordgstrl43mbg5jfj1ezzamf6v9rnitn0.jpg"
          alt=""
        />
      </Link>
      <div className={styles.date}>
        <span>{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
      </div>
      <div className={styles.details}>
        <span className={styles.tag}>قهوه</span>
        <Link href={`/article/${_id}`} className={styles.title}>
          {title}
        </Link>
        <div>
          <p>نویسنده</p>
          <img
            src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g"
            alt=""
          />
          <p>{creator.name}</p>
          <div>
            <MdOutlineSms />
            <span>0</span>
          </div>
          <div className={styles.share}>
            <IoShareSocialOutline />
            <div className={styles.tooltip}>
              <Link href={"/"}>
                <FaTelegram />
              </Link>
              <Link href={"/"}>
                <FaLinkedinIn />
              </Link>
              <Link href={"/"}>
                <FaPinterest />
              </Link>
              <Link href={"/"}>
                <FaTwitter />
              </Link>
              <Link href={"/"}>
                <FaFacebookF />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
