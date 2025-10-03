"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
export default function DataTable({ users, title }) {
    const router=useRouter()
  const handleChangeUserRole = async (userID) => {
    console.log(userID);
    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userID }),
    });
    console.log(res);
    if (res.status == 200) {
      swal({
        title: "نقش کاربر با موفقیت تغییر یافت",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };
    const handleDeleteUser = async (userID) => {
    console.log(userID);
    const res = await fetch(`/api/user/${userID}`, {
      method: "DELETE",
    });
    console.log(res);
    if (res.status == 200) {
      swal({
        title: " کاربر با موفقیت حذف شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
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
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={(e) => handleChangeUserRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}onClick={()=>handleDeleteUser(user._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
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
