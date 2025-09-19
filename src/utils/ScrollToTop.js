"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/scrollToTop.module.css";
import { MdKeyboardArrowUp } from "react-icons/md";
export default function ScrollToTop() {
  const [isShowScroll, setIsShowScroll] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      const toggleShowScroll = window.pageYOffset;
      if (toggleShowScroll > 120) {
        setIsShowScroll(true);
      } else {
        setIsShowScroll(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button className={isShowScroll?styles.buttonVisible:styles.button} onClick={scrollToTop}>
      <MdKeyboardArrowUp />
    </button>
  );
}
