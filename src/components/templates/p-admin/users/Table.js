"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import swal from "sweetalert"; // یادت نره ایمپورت کنی

export default function DataTable({ users, title }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // تغییر نقش
  const handleChangeUserRole = async (userID) => {
    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userID }),
    });

    if (res.status === 200) {
      swal({ title: "نقش کاربر با موفقیت تغییر یافت", icon: "success", buttons: "فهمیدم" })
        .then(() => router.refresh());
    }
  };

  // حذف
  const handleDeleteUser = async (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/user/${userID}`, { method: "DELETE" });
        if (res.status == 200) {
          swal({ title: "کاربر با موفقیت حذف شد", icon: "success", buttons: "فهمیدم" })
            .then(() => router.refresh());
        }
      }
    });
  };

  // بن
  const banUser = async (email, phone) => {
    swal({
      title: "آیا از بن کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, phone }),
        });

        if (res.status === 201) {
          swal({ title: "کاربر مورد نظر با موفقیت بن شد", icon: "success", buttons: "فهمیدم" })
            .then(() => router.refresh());
        }
      }
    });
  };

  // 🔹 ویرایش کاربر
  const handleEditUser = async (formData) => {
    console.log(selectedUser._id,formData);
    
    const res = await fetch(`/api/user/${selectedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      swal({ title: "کاربر با موفقیت ویرایش شد", icon: "success", buttons: "فهمیدم" })
        .then(() => {
          setIsModalOpen(false);
          router.refresh();
        });
    } else {
      swal({ title: "خطا در ویرایش", icon: "error", buttons: "باشه" });
    }
  };

  return (
    <div>
      <h1 className={styles.title}><span>{title}</span></h1>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email || "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => {
                      setSelectedUser(user); // انتخاب کاربر
                      setIsModalOpen(true);   // باز کردن مودال
                    }}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button className={styles.edit_btn} onClick={() => handleChangeUserRole(user._id)}>
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button className={styles.delete_btn} onClick={() => handleDeleteUser(user._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button className={styles.delete_btn} onClick={() => banUser(user.email, user.phone)}>
                    بن
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
        onSubmit={handleEditUser}
        user={selectedUser}
      />
    </div>
  );
}
