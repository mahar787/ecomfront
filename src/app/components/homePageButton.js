"use client";
import React from "react";
import { useRouter } from "next/navigation";
const HomePageButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/products");
      }}
      className="px-4 py-2 rounded-md font-bold text-lg bg-slate-100 border-2 border-gray-200"
    >
      Shop Now
    </button>
  );
};

export default HomePageButton;
