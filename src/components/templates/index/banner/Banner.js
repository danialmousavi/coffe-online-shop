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
          src="/images/slide.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/winter-slie.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/fall.jpg"
          alt="Slide"
        />
      </SwiperSlide>
    </Swiper>
  );
}
