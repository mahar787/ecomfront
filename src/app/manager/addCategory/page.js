"use client";
import { useForm } from "react-hook-form";
import postReq from "@/app/Utilities/postReq";
import ErrorComponent from "@/app/components/errorComponent";
import { useState, useEffect } from "react";
import AlertComponent from "@/app/components/alertComponent";
import getReq from "@/app/Utilities/getReq";
import SideBar from "../managerComponents/sideBar";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/loginManagement");
    }
  }, []);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCategories() {
      try {
        let result = await getReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getParentCategories`
        );
        setCategories(result.response.data);
      } catch (error) {
        console.log("Error in Getting All Categories !", error);
      }
    }
    getCategories();
  }, []);
  const [resError, setResError] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    postReq(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addCategory`, data)
      .then((data) => {
        setLoading(false);
        if (data.statusCode == 200) {
          setApiResponse("Category Inserted Successfully !");
          reset();
        }
        if (data.statusCode != 200) {
          setResError("Category Already Exists Or This Category Not Allowed !");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <section className="flex flex-col gap-5 justify-center m-3 min-h-80 items-center">
      <SideBar />
      {resError && <ErrorComponent message={resError} />}
      {apiResponse && <AlertComponent message={apiResponse} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-3"
      >
        <label className="flex items-center gap-2 justify-start">
          Category Name
          <input
            className="outline-none border-2 rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
            type="text"
            placeholder="Enter Category Name"
            {...register("categoryName", {
              required: "Category Name is Required!",
            })}
          />
        </label>
        {errors.categoryName && (
          <ErrorComponent message={errors.categoryName.message} />
        )}
        <label className="flex items-center gap-2 justify-start">
          Parent Category
          <div className="text-black">
            <select
              className="min-w-52 p-2 bg-blue-800 text-white font-bold rounded-md"
              id="category"
              {...register("parentCategory")}
            >
              <option value="">Select Parent Category</option>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </label>
        {errors.parentCategory && (
          <ErrorComponent message={errors.parentCategory.message} />
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 my-3 py-2 bg-blue-300 rounded-md hover:bg-blue-500"
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Submitting" : "Add Category"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default page;
