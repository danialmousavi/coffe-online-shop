import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = ({p}) => {

  
  return (
    <section className={styles.comment}>
      <img src="/images/user.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{p.username}</strong>
            <p>۲۸ آذر ۱۴۰۱</p>
          </div>
          <div className={styles.stars}>
          {new Array(p.score).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}

          {new Array(5 - p.score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
          </div>
        </div>
        <p>
          {p.body}
        </p>
      </div>
    </section>
  );
};

export default Comment;
