import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({product}) => {
  return (
    <div>
      <p>نظرات ({product.comments.length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
           {product.comments.length}دیدگاه  برای {product.name}
          </p>
          <div>
            {product.comments.map(p=>(
              <Comment key={p._id} p={p} />
            ))}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm />
        </div>
      </main>
    </div>
  );
};

export default Comments;
