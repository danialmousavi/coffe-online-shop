"use client";
import React from "react";
import styles from "@/styles/modal.module.css";

export default function DetailsModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <h2 className={styles.header}>جزئیات محصول</h2>

        <div className={styles.content}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>نام محصول:</th>
                <td>{product.name}</td>
              </tr>
              <tr>
                <th>قیمت:</th>
                <td>{product.price}</td>
              </tr>
              <tr>
                <th>امتیاز:</th>
                <td>{product.score}</td>
              </tr>
              <tr>
                <th>بو:</th>
                <td>{product.smell}</td>
              </tr>
              <tr>
                <th>مناسب برای:</th>
                <td>{product.suitableFor}</td>
              </tr>
              <tr>
                <th>وزن:</th>
                <td>{product.weight}</td>
              </tr>
              <tr>
                <th>توضیح کوتاه:</th>
                <td>{product.shortDescription}</td>
              </tr>
              <tr>
                <th>توضیح بلند:</th>
                <td>{product.longDescription}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
