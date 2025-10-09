"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Modal from "./Modal";
export default function DataTable({ products, title }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
  //edit product
  // 🔹 ویرایش کاربر
  const handleEditProduct = async (formData) => {
    console.log(selectedProduct._id, formData);
    const res = await fetch(`/api/products/${selectedProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      swal({
        title: "محصول با موفقیت ویرایش شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        setIsModalOpen(false);
        router.refresh();
      });
    } else {
      swal({ title: "خطا در ویرایش", icon: "error", buttons: "باشه" });
    }
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
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => {
                      setSelectedProduct(product); // انتخاب کاربر
                      setIsModalOpen(true); // باز کردن مودال
                    }}
                  >
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
      {/* 🔹 مودال */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEditProduct}
        product={selectedProduct}
      />
    </div>
  );
}
