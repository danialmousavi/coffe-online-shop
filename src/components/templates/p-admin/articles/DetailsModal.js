"use client";
import React from "react";
import styles from "@/styles/modal.module.css";

export default function DetailsModal({ isOpen, onClose, article }) {
  if (!isOpen || !article) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <h2 className={styles.header}>محتوای مقاله</h2>

        <div className={styles.content}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>{article.body}</td>
              </tr>
 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
