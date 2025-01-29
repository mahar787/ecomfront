import Image from "next/image";
import React from "react";
import bg1 from "../../../public/bg1.jpg";
import bg2 from "../../../public/bg2.jpg";
import bg3 from "../../../public/bg3.jpg";
import bg4 from "../../../public/bg4.jpg";
import bg5 from "../../../public/bg5.jpg";
import Link from "next/link";
const page = () => {
  return (
    <main>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative w-full h-72">
          <Image
            src={bg1} // Replace with your static image
            alt="Product Name"
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Product Name */}
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            Modern Chair
          </h2>

          {/* Price */}
          <p className="mt-2 text-gray-600 font-medium">$120.00</p>

          {/* Ratings */}
          <div className="flex items-center mt-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.539 1.118L10 13.011l-3.374 2.455c-.783.57-1.838-.197-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.636 9.39c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.962z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.539 1.118L10 13.011l-3.374 2.455c-.783.57-1.838-.197-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.636 9.39c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.962z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.539 1.118L10 13.011l-3.374 2.455c-.783.57-1.838-.197-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.636 9.39c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.962z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.539 1.118L10 13.011l-3.374 2.455c-.783.57-1.838-.197-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.636 9.39c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.962z"></path>
            </svg>
          </div>

          {/* View Details Button */}
          <button className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </main>
  );
};

export default page;
