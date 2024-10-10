import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Pagination, Scrollbar, Navigation } from "swiper/modules";
import { CheckIcon } from "@heroicons/react/24/outline";

interface SliderProps {
  slides: React.ReactNode[];
  loop?: boolean;
  autoPlay?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  loop = true,
  autoPlay,
  slidesPerView = 1,
  spaceBetween = 50,
}) => {
  return (
    <div className="slider-container">
      <Swiper
        style={{ zIndex: 1, borderRadius: "8px" }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
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
