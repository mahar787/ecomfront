"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import getReq from "../Utilities/getReq.js";
const CategoriesHeader = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      try {
        let result = await getReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getAllCategories`
        );
        setCategories(result.response.data);
      } catch (error) {
        console.log("Error in Getting All Categories !", error);
      }
    }
    getCategories();
  }, []);
  return (
    <section className="flex items-center shadow-lg  p-2 justify-between w-[100vw] ">
      <nav
        className="flex p-2 gap-3"
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <a
                key={category._id}
                className="hover:text-blue-400"
                href={`/products?page=1&categoryId=${category._id}`}
              >
                {category.name}
              </a>
            );
          })}
      </nav>
    </section>
  );
};

export default CategoriesHeader;
