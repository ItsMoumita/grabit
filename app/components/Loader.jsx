// app/components/Loader.jsx
"use client";

import Lottie from "lottie-react";
import animationData from "@/app/lottie/loader.json";

export default function Loader({
  size = 160,
  label = "Loading...",
  loop = true,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay
        style={{ width: size, height: size }}
      />
      {label ? (
        <p className="mt-2 text-sm font-medium text-[#2a4ba7] dark:text-[#b8d9ff]">
          {label}
        </p>
      ) : null}
    </div>
  );
}