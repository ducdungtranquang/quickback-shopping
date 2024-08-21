import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Pagination, Scrollbar, Navigation } from "swiper/modules";

// Định nghĩa kiểu props cho component
interface SliderProps {
  slides: React.ReactNode[]; // Mảng các React elements (VD: hình ảnh, đoạn text, etc)
  loop?: boolean; // Option để lặp lại slider
  autoPlay?: boolean; // Option để tự động chạy slider
}

const Slider: React.FC<SliderProps> = ({
  slides,
  loop = true,
  autoPlay = false,
}) => {
  return (
    <div className="slider-container">
      <Swiper
        style={{ zIndex: 1, borderRadius: "20px" }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={loop}
        autoplay={
          autoPlay ? { delay: 3000, disableOnInteraction: false } : false
        }
        className="w-full h-full"
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
