"use client";

import { useState } from "react";
import swal from "sweetalert";
import styles from "@/styles/modal.module.css";

export default function Modal({ isOpen, onClose, onSubmit, product }) {
  if (!isOpen || !product) return null;

  // ایجاد state برای هر فیلد
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const [score, setScore] = useState(product.score || "");
  const [smell, setSmell] = useState(product.smell || "");
  const [suitableFor, setSuitableFor] = useState(product.suitableFor || "");
  const [weight, setWeight] = useState(product.weight || "");
  const [shortDescription, setShortDescription] = useState(product.shortDescription || "");
  const [longDescription, setLongDescription] = useState(product.longDescription || "");

  // ولیدیشن فرم
const validateForm = () => {
  if (!name.trim()) {
    swal("خطا", "نام محصول الزامی است", "error");
    return false;
  }

  if (!price || isNaN(Number(price))) {
    swal("خطا", "قیمت باید عددی و الزامی باشد", "error");
    return false;
  }

  if (!score || isNaN(Number(score))) {
    swal("خطا", "امتیاز باید عددی و الزامی باشد", "error");
    return false;
  }

  if (!smell.trim()) {
    swal("خطا", "فیلد بو الزامی است", "error");
    return false;
  }

  if (!suitableFor.trim()) {
    swal("خطا", "فیلد مناسب برای الزامی است", "error");
    return false;
  }

  if (!weight) {
    swal("خطا", "وزن محصول الزامی است", "error");
    return false;
  }

  if (!shortDescription.trim()) {
    swal("خطا", "توضیح کوتاه الزامی است", "error");
    return false;
  }

  if (!longDescription.trim()) {
    swal("خطا", "توضیح بلند الزامی است", "error");
    return false;
  }

  return true;
};


  // ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // ارسال داده‌ها به والد
    onSubmit({
      name,
      price,
      score,
      smell,
      suitableFor,
      weight,
      shortDescription,
      longDescription,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.header}>ویرایش محصول</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="نام محصول" className={styles.input} />
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="قیمت" className={styles.input} />
          <input type="text" value={score} onChange={(e) => setScore(e.target.value)} placeholder="امتیاز" className={styles.input} />
          <input type="text" value={smell} onChange={(e) => setSmell(e.target.value)} placeholder="بو" className={styles.input} />
          <input type="text" value={suitableFor} onChange={(e) => setSuitableFor(e.target.value)} placeholder="مناسب برای" className={styles.input} />
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="وزن" className={styles.input} />
          <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="توضیح کوتاه" className={styles.input} />
          <textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} placeholder="توضیح بلند" className={styles.input}></textarea>
          <button type="submit" className={styles.submitBtn}>ذخیره</button>
        </form>
      </div>
    </div>
  );
}
