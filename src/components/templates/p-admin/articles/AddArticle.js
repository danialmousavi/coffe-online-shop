"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function AddArticle() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState({});

  const addProduct = async () => {
    // Validation (You) ✅👇

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("weight", weight);
    formData.append("suitableFor", suitableFor);
    formData.append("smell", smell);
    formData.append("tags", tags.split("،"));
    formData.append("img", img);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    console.log("Res ->", res);

    if (res.status === 201) {
      swal({
        title: "محصول مورد نظر با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
      setName("");
      setPrice("");
      setShortDescription("");
      setLongDescription("");
      setSmell("");
      setSuitableFor("");
      setImg({});
      setTags("");
      setWeight("")
    }
  };
  return (
    <section className={styles.discount}>
      <p>افزودن مقاله جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>عنوان</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="لطفا نام محصول را وارد کنید"
            type="text"
          />
        </div>


        <div>
          <label>توضیحات کوتاه</label>
          <input
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            placeholder="توضیحات کوتاه محصول"
            type="text"
          />
        </div>
        <div>
          <label>بدنه</label>
          <input
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
            placeholder="توضیحات بلند محصول"
            type="text"
          />
        </div>

      </div>
      <button onClick={addProduct}>افزودن</button>
    </section>
  );
}

export default AddArticle;
