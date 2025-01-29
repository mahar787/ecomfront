"use client";
import React from "react";
import postReq from "@/app/Utilities/postReq";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ErrorComponent from "@/app/components/errorComponent";
import userImg from "../../../../public/user.png";
import verifyUser from "@/app/Utilities/verifyUser";
import AlertComponent from "@/app/components/alertComponent";
const page = ({ params }) => {
  let unwrappedParams = React.use(params);
  let id = unwrappedParams.id;
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [reviews, setReviews] = useState([]);
  async function getReviews(id) {
    try {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getReviews`,
        { id }
      );
      setReviews(result.response.data);
    } catch (error) {
      console.log("Error in fetching reviews !", error);
    }
  }
  useEffect(() => {
    async function getProduct() {
      try {
        let response = await postReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getProduct`,
          { id }
        );
        setProducts(response.response.data);
        console.log("products array", response.response.data);
        setImages(response.response.data[0].images);
        setMainImage(response.response.data[0].images[0].imageUrl);
        setAvailableSizes(response.response.data[0].product?.availableSizes);
        setProductId(response.response.data[0].product._id);
        getReviews(response.response.data[0].product._id);
        setAvailableColors(
          response.response.data[0].product.availableColors
            ? response.response.data[0].product.availableColors.split(",")
            : ""
        );
      } catch (error) {
        console.log("Error in Fetching Product !", error);
      }
    }
    getProduct();
  }, []);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const handleSizeSelection = (size) => {
    if (selectedSizes.includes(size)) {
      // Remove the size if it's already selected
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      // Add the size if it's not selected
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      // Remove the size if it's already selected
      setSelectedColors(selectedColors.filter((s) => s !== color));
    } else {
      // Add the size if it's not selected
      setSelectedColors([...selectedColors, color]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [resError, setResError] = useState("");
  async function verifyUser(token) {
    try {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/verify`,
        {
          token,
        }
      );
      if (result.statusCode == 200) {
        return result.response.data.id;
      } else {
        setResError(res.response.data);
      }
      return result;
    } catch (error) {
      console.log("error", error);
    }
  }
  const [apiRes, setApiRes] = useState("");
  const handleChoiceSubmit = async () => {
    if (
      availableColors &&
      availableColors.length > 0 &&
      selectedColors.length == 0
    ) {
      setResError("Please Select At Least One Color");
    }
    if (
      availableSizes &&
      availableSizes.length > 0 &&
      selectedSizes.length == 0
    ) {
      setResError("Please Select At Least One Size");
    }
    if (quantity == 0) {
      setResError("Please Select At Least One Product");
    } else {
      setLoading(true);
      let token = localStorage.getItem("zxcvbnm");
      if (token) {
        let userId = await verifyUser(token);
        let Item = {
          userId,
          selectedSizes,
          selectedColors,
          quantity,
          itemPrice: products[0].product.retailPrice,
          itemId: products[0].product._id,
        };
        let response = await postReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addToCart`,
          Item
        );
        if (response.statusCode == 200) {
          setApiRes(response.response.data);
          router.push("/cart");
        }
        setLoading(false);
        if (response.statusCode == 500) {
          setResError(response.response.data);
        }
      } else {
        router.push("/login");
      }
    }
  };
  const onSubmit = async (data) => {
    setLoading(true);
    let token = localStorage.getItem("zxcvbnm");
    if (token) {
      let userId = await verifyUser(token);
      let review = {
        text: data,
        user: userId,
        product: products[0].product._id,
      };
      await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addReview`,
        review
      )
        .then((data) => {
          if (data.statusCode == 200) {
            setLoading(false);
            window.location.reload();
          } else {
            setResError(data.response.data);
          }
          reset();
        })
        .catch((error) => {
          console.log("Error of review", error);
          reset();
        });
    } else {
      setLoading(false);
      reset();
      router.replace("/login");
    }
  };

  return (
    <section
      className="py-12 sm:py-16 w-screen text-gray-800 bg-white"
      style={{ position: "relative" }}
    >
      <div className="" style={{ position: "relative" }}>
        {resError && <ErrorComponent message={resError} />}
        {apiRes && <AlertComponent message={apiRes} />}
      </div>
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={mainImage ? mainImage : "#"}
                    alt="Product Image"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  {images.map((item) => {
                    return (
                      <button
                        key={item._id}
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                        onClick={() => {
                          setMainImage(item.imageUrl);
                        }}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={item.imageUrl}
                          alt="Product Image"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {products &&
                products.map((item) => {
                  return item.product.name;
                })}
            </h1>

            <div className="flex gap-2 flex-wrap my-2">
              <h2 className="font-bold">Brand :</h2>
              <p className="italic">
                {products.length > 0 &&
                  products.map((product) => {
                    return product.product.brand;
                  })}
              </p>
            </div>
            <div className="">
              <label>
                {availableSizes && availableSizes.length > 0
                  ? "Available Sizes"
                  : ""}
              </label>
            </div>
            <div className="flex gap-1 mt-3 flex-wrap">
              {availableSizes &&
                availableSizes.length > 0 &&
                availableSizes.map((item) => {
                  return (
                    <label key={item}>
                      <input
                        type="checkbox"
                        name="size"
                        value={item}
                        className="peer sr-only"
                        onChange={() => handleSizeSelection(item)}
                      />
                      <p
                        className={`peer-checked:bg-black  peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold ${
                          selectedSizes.includes(item)
                            ? "bg-black text-white"
                            : ""
                        }`}
                      >
                        {item}
                      </p>
                    </label>
                  );
                })}
            </div>
            <div className="my-3">
              <label>
                {availableColors && availableColors.length > 0
                  ? "Available Colors"
                  : ""}
              </label>
            </div>
            <div className="flex gap-1 mt-3 flex-wrap">
              {availableColors &&
                availableColors.length > 0 &&
                availableColors.map((item) => {
                  return (
                    <label key={item}>
                      <input
                        type="checkbox"
                        name="size"
                        value={item}
                        className="peer sr-only"
                        onChange={() => handleColorSelection(item)}
                      />
                      <p
                        className={`peer-checked:bg-black  peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold ${
                          selectedColors.includes(item)
                            ? "bg-black text-white"
                            : ""
                        }`}
                      >
                        {item}
                      </p>
                    </label>
                  );
                })}
              <div className="my-2">
                <div className="my-2">Quantity</div>
                <div className="flex gap-3 items-center justify-between w-40">
                  <button
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                    className="bg-blue-600 text-white font-bold px-4 rounded-sm shadow-lg py-2"
                  >
                    +
                  </button>
                  <p className="font-bold">{quantity}</p>
                  <button
                    onClick={() => {
                      setQuantity(quantity - 1);
                    }}
                    disabled={quantity == 0 ? true : false}
                    className="bg-blue-600 text-white font-bold px-4 rounded-sm shadow-lg py-2"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">
                  {products.length > 0 &&
                    products.map((product) => {
                      return product.product.retailPrice;
                    })}
                </h1>
                <span className="text-base">/RS</span>
              </div>

              <button
                type="submit"
                onClick={() => {
                  handleChoiceSubmit();
                }}
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {loading ? "Adding" : "Add to cart"}
              </button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  ></path>
                </svg>
                Provide Shipping All Over Pakistan
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="mt-8 flow-root sm:mt-12">
              <h1 className="text-3xl font-bold">Description</h1>
              <p className="mt-4">
                {products.length > 0 &&
                  products.map((product) => {
                    return product.product.description;
                  })}
              </p>
            </div>
            <div className="mt-8 flow-root sm:mt-12">
              <h1 className="text-3xl font-bold">Reviews</h1>
              <div>
                {reviews.length > 0
                  ? reviews.map((review) => {
                      return (
                        <ul key={review._id} className="">
                          <li className="py-8 text-left border px-4 m-2">
                            <div className="flex items-start">
                              <Image
                                className="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle"
                                src={userImg}
                                alt="User Placeholder Image"
                                priority={false}
                              />

                              <div className="ml-6">
                                <p className="mt-5 text-base text-gray-900">
                                  {review.reviewText}
                                </p>
                                <p className="mt-5 text-sm font-bold text-gray-900">
                                  {review.User.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                  {" "}
                                  Date: {review.createdAt.split("T")[0]}
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      );
                    })
                  : "No Reviews !"}
              </div>

              <form
                className=" flex flex-col shadow-lg p-3 gap-2  rounded-md"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="text-gray-900 text-lg">
                  Enter Your Review !{" "}
                </label>
                <input
                  className="min-w-48 p-2 rounded-md border-2   "
                  placeholder="Enter Your Review"
                  {...register("review", {
                    required: "Please Enter Some Text For Review !",
                  })}
                />
                <div className="flex justify-end">
                  <button className="px-3 py-2 bg-blue-400 hover:bg-blue-600  rounded-md">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
