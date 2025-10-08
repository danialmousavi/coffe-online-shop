"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
export default function DataTable({ products, title }) {
  const router = useRouter();

  //delete product
  const handleDeleteProduct = async (id) => {
    console.log(id);
    swal({
      title: "آیا از حذف این محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (res) => {
      if (res) {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        console.log(res);
        if (res.status == 200) {
          swal({
            title: "محصول با موفقیت حذف شد",
            icon: "success",
            buttons: "متوجه شدم",
          }).then(() => {
            router.refresh();
          });
        } else {
          swal({
            title: " متاسفانه مشکلی پیش آمده لطفا بعدا تلاش کنید",
            icon: "error",
            buttons: "متوجه شدم",
          });
        }
      }
    });
  };
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>قیمت</th>
              <th>امتیاز</th>
              <th>مشاهده جزئیات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.score}</td>

                <td>
                  <button type="button" className={styles.edit_btn}>
                    مشاهده جزئیات
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
