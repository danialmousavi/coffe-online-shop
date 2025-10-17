"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/modules/Editor/Editor";

function AddArticle() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  
  const AddArticleHandler = async () => {
    const newArticle={
      title,
      body,
      shortDescription
    }
    console.log(newArticle);
    
    const res = await fetch("/api/articles", {
      method: "POST",
      headers:{
           "Content-Type": "application/json", 
      },
      body: JSON.stringify(newArticle),
    });

    console.log("Res ->", res);

    if (res.status === 201) {
      swal({
        title: "مقاله مورد نظر با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
      setTitle("");
      setBody("");
      setShortDescription("");

    }
  };
  return (
    <section className={styles.discount}>
      <p>افزودن مقاله جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>عنوان</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="لطفا عنوان مقاله را وارد کنید"
            type="text"
          />
        </div>

<br />
        <div>
          <label>توضیحات کوتاه</label>
          <input
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            placeholder="توضیحات کوتاه محصول"
            type="text"
          />
        </div>
          <br />
        <div>
          {/* <input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="متن مقاله"
            type="text"
          /> */}
          <RichTextEditor setBody={setBody} body={body}/>
        </div>

      </div>
      <button onClick={AddArticleHandler}>افزودن</button>
    </section>
  );
}

export default AddArticle;
