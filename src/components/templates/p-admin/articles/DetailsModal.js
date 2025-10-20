"use client";
import React from "react";
import styles from "@/styles/articleModal.module.css";
import DOMPurify from "dompurify";

export default function DetailsModal({ isOpen, onClose, article }) {
  if (!isOpen || !article) return null;

  const cleanBody = DOMPurify.sanitize(article.body);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>{article.title}</h2>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: cleanBody }}
        />
      </div>
    </div>
  );
}
