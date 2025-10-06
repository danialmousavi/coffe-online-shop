"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import { showSwal } from "@/utils/Helpers";

const stateOptions = stateData();

const Table = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [activeDiscount, setActiveDiscount] = useState(null);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(calcTotalPrice, [cart]);

  function calcTotalPrice() {
    let price = 0;
    if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    }
    setOriginalPrice(price);
    setTotalPrice(price);
  }

  const checkDiscount = async () => {
    if (!discount) {
      return showSwal("کد تخفیفی وارد نشده است", "error", "باشه");
    }

    const res = await fetch("/api/discounts/use", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: discount }),
    });

    if (res.status === 404) {
      return showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    } else if (res.status === 422) {
      return showSwal("کد تخفیف وارد شده منقضی شده", "error", "تلاش مجدد");
    } else if (res.status === 200) {
      const discountCode = await res.json();
      const percent = discountCode.percent;

      const newPrice = originalPrice - (originalPrice * percent) / 100;

      setTotalPrice(newPrice);
      setActiveDiscount(percent);

      return showSwal("کد تخفیف با موفقیت اعمال شد", "success", "فهمیدم");
    }
  };

  return (
    <>
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span>-</span>
                    <p>{item.count}</p>
                    <span>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt={item.name}
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>
                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section>
          <button className={styles.update_btn}>بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn} onClick={checkDiscount}>
              اعمال کوپن
            </button>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="کد تخفیف"
            />
          </div>
        </section>
      </div>

      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء</p>
          <p>{originalPrice.toLocaleString()} تومان</p>
        </div>

        {activeDiscount && (
          <div className={totalStyles.discount}>
            <p>تخفیف ({activeDiscount}٪)</p>
            <p>{(originalPrice - totalPrice).toLocaleString()} تومان</p>
          </div>
        )}

        <p className={totalStyles.motor}>
          پیک موتوری: <strong>30,000</strong>
        </p>

        <div className={totalStyles.total}>
          <p>مجموع پس از تخفیف</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>

        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تسویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
