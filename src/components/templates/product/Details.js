"use client"
import { FaFacebookF, FaRegStar, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import AddToWishList from "./AddToWishList";
import { useState } from "react";
import { showSwal } from "@/utils/Helpers";

const Details = ({ product }) => {
  const [count,setCount]=useState(0);
const addToCart = () => {
  // گرفتن لیست سبد خرید قبلی
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // بررسی اینکه این محصول قبلا هست یا نه
  const productIndex = cart.findIndex((item) => item.id === product._id);

  if (productIndex >= 0) {
    // اگر قبلا بود، تعداد رو اضافه کن
    cart[productIndex].count += count || 1;
  } else {
    // اگر نبود، اضافه‌اش کن
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      count: count || 1,
    });
  }

  // ذخیره دوباره در localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  showSwal("محصول به سبد خرید اضافه شد","success","متوجه شدم");
};
  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={product.name} />
      <h2>{product.name}</h2>

      <div className={styles.rating}>
        <div>
          {new Array(product.score).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}

          {new Array(5 - product.score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <p>({product.comments.length}دیدگاه کاربر)</p>
      </div>

      <p className={styles.price}>{product.price} تومان</p>
      <span className={styles.description}>{product.shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button onClick={addToCart}>افزودن به سبد خرید</button>
        <div>
          <span onClick={()=>setCount((prev)=>prev-1)}>-</span>{count}<span onClick={()=>setCount((prev)=>prev+1)}>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
          <AddToWishList productID={product._id}/>
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {product._id}</strong>
        <strong>برچسب:</strong>
        {product.tags.map((tag,index) => (
          <p key={index}>{tag}</p>
        ))}
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
