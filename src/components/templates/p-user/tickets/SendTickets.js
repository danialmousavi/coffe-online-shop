"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";

export default function SendTickets() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [DepartmentID, setDepartmentID] = useState(-1);
  const [subDepartmentID, setSubDepartmentID] = useState(-1);

  useEffect(() => {
    const getAllDepartments = async () => {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments(data);
    };
    getAllDepartments();
  }, []);
  useEffect(() => {
    const getAllSubDepartments = async () => {
      const res = await fetch(`/api/departments/sub/${DepartmentID}`);
      if (res.status == 200) {
        const data = await res.json();
        setSubDepartments(data);
      }
    };
    getAllSubDepartments();
  }, [DepartmentID]);
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets"> همه تیکت ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>
          <select onChange={(e) => setDepartmentID(e.target.value)}>
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            {departments?.map((department) => (
              <option key={department._id} value={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          {subDepartments.length > 0 && (
            <>
              <label>نوع تیکت را انتخاب کنید:</label>
              <select>
                <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
                {subDepartments?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.title}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <input placeholder="عنوان..." type="text" />
        </div>
        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select>
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            <option value="3">کم</option>
            <option value="2">متوسط</option>
            <option value="1">بالا</option>
          </select>
        </div>
      </div>
      <div className={styles.group}>
        <label>محتوای تیکت را وارد نمایید:</label>
        <textarea rows={10}></textarea>
      </div>
      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button className={styles.btn}>
        <IoIosSend />
        ارسال تیکت
      </button>
    </main>
  );
}
