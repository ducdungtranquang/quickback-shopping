import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface SlideData {
  title: string;
  image: string; // URL to the image
  days: number;
}

interface SliderProps {
  slides: SlideData[];
}

const TreeSlider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="flex flex-col items-center">
          <img src={slide.image} alt={slide.title} className="w-32 h-32 mb-4" />
          <h2 className="text-xl font-semibold">{slide.title}</h2>
          <p className="text-gray-600">Chọn mục tiêu số ngày học liên tiếp</p>
          <div className="flex space-x-2">
            <span className="bg-green-200 text-green-600 px-2 py-1 rounded">
              {slide.days} days
            </span>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
            Trồng ngay
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TreeSlider;
