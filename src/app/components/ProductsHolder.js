"use client";
import { useState, useEffect } from "react";
import ProductsonLandingPage from "./productsonLandingPage";
import getReq from "../Utilities/getReq";
import { useRouter } from "next/navigation";
const ProductsHolder = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      let response = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getProducts`
      );
      setProducts(response.response.data);
    }
    getProducts();
  }, []);
  return (
    <>
      <section className="flex gap-3 flex-wrap justify-center">
        {Array.isArray(products) && products.length > 0
          ? products.map((product) => {
              return (
                <ProductsonLandingPage
                  id={product._id}
                  key={product._id}
                  name={product.product}
                  image={product.images[0].imageUrl}
                  altText={product.images[0].altText}
                  retailPrice={product.retailPrice}
                  rating={product.rating}
                />
              );
            })
          : "No products Available"}
      </section>
      <div className="flex justify-center">
        <button
          onClick={() => {
            router.push("/products");
          }}
          className="py-2 px-4 font-bold bg-gray-300 hover:bg-gray-400 my-3 text-xl mb-6"
        >
          Browse Products
        </button>
      </div>
    </>
  );
};

export default ProductsHolder;
