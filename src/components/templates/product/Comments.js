import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({product}) => {
  console.log("productttttt",product);
  
  return (
    <div>
      <p>نظرات ({product.comments.filter(c=>c.isAccept).length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
           {product.comments.filter(c=>c.isAccept).length}دیدگاه  برای {product.name}
          </p>
          <div>
            {product.comments.filter(c=>c.isAccept).map(p=>(
              <Comment key={p._id} p={p} />
            ))}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productID={product._id} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
