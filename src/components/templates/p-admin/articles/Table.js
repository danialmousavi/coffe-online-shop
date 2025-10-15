"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Modal from "./Modal";
import DetailsModal from "./DetailsModal";
export default function DataTable({ articles, title }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [articleDetail,setArticleDetail]=useState({});
  //delete product
  const handleDeleteArticle = async (id) => {
    console.log(id);
    swal({
      title: "آیا از حذف این مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (res) => {
      if (res) {
        const res = await fetch(`/api/articles/${id}`, {
          method: "DELETE",
        });
        console.log(res);
        if (res.status == 200) {
          swal({
            title: "مقاله با موفقیت حذف شد",
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
              <th>عنوان</th>
              <th>توضیحات کوتاه</th>
              <th>مشاهده جزئیات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortDescription}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => {
                      setArticleDetail(article); // انتخاب مقاله
                      setIsDetailModalOpen(true); // باز کردن مودال
                    }}
                  >
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
                    onClick={() => handleDeleteArticle(article._id)}
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
      <DetailsModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        article={articleDetail}
      />
    </div>
  );
}
