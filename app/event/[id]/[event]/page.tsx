"use client";
import { useState, useRef } from "react";

// Danh sách giải thưởng với màu sắc tương ứng
const prizes = [
  { name: "500k Voucher", color: "#f00" }, // Đỏ
  { name: "iPhone 14", color: "#0f0" }, // Xanh lá
  { name: "MacBook Pro", color: "#00f" }, // Xanh dương
  { name: "Túi quà bí mật", color: "#ff0" }, // Vàng
  { name: "Tai nghe AirPods", color: "#0ff" }, // Xanh nhạt
  { name: "Xe máy SH", color: "#f0f" }, // Tím
  { name: "Voucher ăn uống", color: "#fff" }, // Trắng
  { name: "iPad Pro", color: "#000" }, // Đen
];

// Trọng số (tỷ lệ) tương ứng với các giải thưởng
const weights = [30, 2, 2, 20, 15, 5, 24, 2];

const getRandomPrize = () => {
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < prizes.length; i++) {
    if (random < weights[i]) {
      return i; // Trả về chỉ số của giải thưởng
    }
    random -= weights[i];
  }
  return 0;
};

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    const randomDegree = Math.floor(Math.random() * 360) + 1000;
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s ease-out";
      wheelRef.current.style.transform = `rotate(${randomDegree}deg)`;

      setTimeout(() => {
        const prizeIndex = getRandomPrize();
        setSelectedPrize(prizes[prizeIndex].name);

        setIsSpinning(false);
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Vòng Quay May Mắn</h1>

      <div className="relative">
        <div
          ref={wheelRef}
          className="w-[320px] h-[320px] border-8 border-gray-300 rounded-full flex items-center justify-center relative"
          style={{
            backgroundImage: `conic-gradient(
              ${prizes
                .map(
                  (prize, index) =>
                    `${prize.color} ${index * (100 / prizes.length)}% ${
                      (index + 1) * (100 / prizes.length)
                    }%`
                )
                .join(", ")}
            )`,
          }}
        >
          <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
            🎯
          </div>

          {prizes.map((prize, index) => (
            <div
              key={index}
              className="absolute text-xs text-center font-semibold"
              style={{
                transform: `rotate(${
                  index * (360 / prizes.length) + 68
                }deg) translateX(90px) rotate(0deg)`,
                transformOrigin: "center",
                width: "100px",
              }}
            >
              {prize.name}
            </div>
          ))}
        </div>
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-red-500 w-4 h-8"></div>
      </div>

      <button
        onClick={spinWheel}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        disabled={isSpinning}
      >
        {isSpinning ? "Đang quay..." : "Quay Ngay"}
      </button>

      {selectedPrize && (
        <div className="mt-8 text-2xl font-semibold text-green-600">
          Bạn đã trúng: {selectedPrize}
        </div>
      )}
    </div>
  );
};

export default Wheel;
