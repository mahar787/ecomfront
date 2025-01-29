"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../managerComponents/sideBar";
import { useForm } from "react-hook-form";
import getReq from "@/app/Utilities/getReq";
import postReq from "@/app/Utilities/postReq";
import AlertComponent from "@/app/components/alertComponent";
import ErrorComponent from "@/app/components/errorComponent";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/loginManagement");
    }
  }, []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [resError, setResError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let confirm = window.confirm("Are You Sure You Want To Delete Product !");
    if (confirm) {
      setLoading(true);
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/deleteProduct`,
        { data }
      );
      if (result.statusCode === 200) {
        setApiResponse(result.response.message);
        setLoading(false);
      } else {
        setResError(result.response.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    async function getAllProducts() {
      try {
        let result = await getReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getAllProducts`
        );
        if (result.statusCode === 200) {
          setProducts(result.response.data);
        }
      } catch (error) {
        console.log("Error in fetching all products !", error);
      }
    }
    getAllProducts();
  }, []);
  return (
    <section className="w-[100vw] min-h-[100vh]">
      <SideBar />
      {apiResponse && <AlertComponent message={apiResponse} />}
      {resError && <ErrorComponent message={resError} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 p-4"
      >
        <label className="flex items-center gap-2 justify-start">
          Product
          <div className="text-black">
            <select
              className="min-w-52 p-2 bg-blue-800 text-white font-bold rounded-md"
              id="product"
              {...register("product")}
            >
              <option value="">Select Product</option>
              {Array.isArray(products) &&
                products.length > 0 &&
                products.map((product) => {
                  return (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </label>
        {errors.product && <ErrorComponent message={errors.product.message} />}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-white bg-red-600"
          >
            {loading ? "Submitting" : "Delete"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default page;
