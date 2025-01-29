"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ErrorComponent from "../../components/errorComponent";
import postReqForAddData from "../../Utilities/Post";
import getReq from "../../Utilities/getReq";
import AlertComponent from "../../components/alertComponent";
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
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getAllCategories`
        );
        console.log(result);
        setCategories(result.response.data);
        console.log(result.response.data.sort());
      } catch (error) {
        console.log("Error in Getting All Categories !", error);
      }
    }
    getCategories();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle Image Previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  const [resError, setResError] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    // console.log(data);

    // Add images to FormData
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file); // Append files individually
      });
    }

    // Add other form data as a JSON string
    const textData = {
      name: data.name,
      wholeSalePrice: data.wholeSalePrice,
      category: data.category,
      availableColors: data.availableColors,
      availableSizes: data.availableSizes,
      RetailPrice: data.RetailPrice,
      Description: data.Description,
      Rating: data.Rating,

      Brand: data.Brand,
      size: data.size,
    };

    formData.append("data", JSON.stringify(textData)); // Add text fields as JSON

    postReqForAddData(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addProduct`,
      formData
    )
      .then((data) => {
        setLoading(false);
        if (data.statusCode == 200) {
          setApiResponse("Product Inserted Successfully !");
          reset();
          console.log(data);
        }
        if (data.statusCode != 200) {
          setResError("Product Not Inserted ! Something Went Wrong .");
        }
        reset();
        setImagePreviews([]);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <main
      className="flex flex-col gap-2 px-10 sm:px-24 md:px-36 w-full h-auto"
      style={{ overflowX: "hidden" }}
    >
      <SideBar />
      {resError && <ErrorComponent message={resError} />}
      {apiResponse && <AlertComponent message={apiResponse} />}
      <div className="flex justify-center">
        <h1 className="text-3xl my-3 text-blue-400 font-bold">Add Products</h1>
      </div>
      <form
        className="flex flex-col gap-1 min-w-72 sm:min-w-80 md:min-w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 md:gap-10">
          <label className="font-bold text-base sm:text-lg md:text-xl">
            Select Images and Also You Can Select Multiple Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("images", {
              required: "Please select at least one image!",
              onChange: handleImageChange,
            })}
          />
        </div>
        {errors.images && <ErrorComponent message={errors.images.message} />}

        {/* Display Image Previews */}
        <div className="flex flex-wrap gap-2 mt-2">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover border rounded-md"
            />
          ))}
        </div>

        <label>Name</label>
        <input
          className="outline-none rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
          type="text"
          placeholder="Enter Product Name"
          {...register("name", { required: "Product Name is Required!" })}
        />
        {errors.name && <ErrorComponent message={errors.name.message} />}
        <label>wholeSalePrice</label>
        <input
          className="outline-none rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
          type="number"
          placeholder="Enter WholeSalePrice"
          {...register("wholeSalePrice", {
            required: "WholeSalePrice is Required!",
          })}
        />
        {errors.wholeSalePrice && (
          <ErrorComponent message={errors.wholeSalePrice.message} />
        )}
        <label>Category</label>
        <div className="text-black">
          <select
            className="min-w-52 p-2 bg-blue-800 text-white font-bold rounded-md"
            id="category"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
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
        {errors.category && (
          <ErrorComponent message={errors.category.message} />
        )}
        <label>RetailPrice</label>
        <input
          className="outline-none rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
          type="number"
          placeholder="Enter RetailPrice"
          {...register("RetailPrice", {
            required: "RetailPrice is Required!",
          })}
        />
        {errors.RetailPrice && (
          <ErrorComponent message={errors.RetailPrice.message} />
        )}
        <label>Description</label>
        <input
          className="outline-none rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
          type="text"
          placeholder="Enter Description"
          {...register("Description", {
            required: "Description is Required!",
          })}
        />
        {errors.Description && (
          <ErrorComponent message={errors.Description.message} />
        )}
        <label>Rating </label>
        <span>Please Select Between 1 and 5</span>
        <input
          className="outline-none rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
          type="number"
          placeholder="Enter Rating Between 1 and 5"
          min="1"
          max="5"
          step="0.1"
          {...register("Rating", {
            required: "Rating is Required!",
            min: {
              value: 1,
              message: "Rating must be at least 1",
            },
            max: {
              value: 5,
              message: "Rating must be at most 5",
            },
          })}
        />
        {errors.Rating && <ErrorComponent message={errors.Rating.message} />}

        <label>Brand</label>
        <input
          className="outline-none rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
          type="text"
          placeholder="Enter Brand"
          {...register("Brand", {
            required: "Brand is Required!",
          })}
        />
        {errors.Brand && <ErrorComponent message={errors.Brand.message} />}
        <label>Available Colors</label>
        <input
          className="outline-none rounded-md p-2 min-w-52 sm:min-w-72 md:min-w-80 mx-2 text-black"
          type="text"
          placeholder="Enter Available Colors"
          {...register("availableColors")}
        />
        {errors.availableColors && (
          <ErrorComponent message={errors.availableColors.message} />
        )}
        <label>Available Sizes</label>
        <div className="flex flex-wrap gap-2">
          {["extraSmall", "small", "medium", "large", "extraLarge"].map(
            (size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  value={size}
                  {...register("availableSizes")}
                  className="mr-2"
                />
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </label>
            )
          )}
        </div>
        {errors.availableSizes && (
          <ErrorComponent message={errors.availableSizes.message} />
        )}

        <label>SizeType</label>
        <div className="text-black">
          <select
            className="min-w-52 p-2 bg-blue-800 text-white font-bold rounded-md"
            id="size"
            {...register("size", { required: "Size is required" })}
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
        </div>
        {errors.size && <ErrorComponent message={errors.size.message} />}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 my-3 py-2 bg-blue-500 rounded-md hover:bg-blue-700"
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Submitting" : "Add Product"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default page;
