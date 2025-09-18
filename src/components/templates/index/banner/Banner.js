"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation , Autoplay } from "swiper/modules";
export default function Banner() {
  return (
    <Swiper navigation={true} rewind={true} loop={true} modules={[Navigation,Autoplay]} className="mySwiper">
      <SwiperSlide>
        <img
          src="https://set-coffee.com/wp-content/uploads/2023/12/slide.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://set-coffee.com/wp-content/uploads/2021/10/winter-slie.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://set-coffee.com/wp-content/uploads/2022/06/fall.jpg"
          alt="Slide"
        />
      </SwiperSlide>
    </Swiper>
  );
}
