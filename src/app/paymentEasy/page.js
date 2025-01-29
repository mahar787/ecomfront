"use client";
import React, { useEffect, useState } from "react";
import cross from "../../../public/cross.svg";
import uploader from "../../../public/uploader.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import verifyUser from "../Utilities/verifyUser";
import postReq from "../Utilities/postReq";
import { useSearchParams } from "next/navigation";
import check from "../../../public/check.png";
import { useRouter } from "next/navigation";
import getReq from "../Utilities/getReq";
const page = () => {
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [preview, setPreview] = useState(null);
  const [additionals, setAdditionals] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  useEffect(() => {
    async function getAdditionals() {
      let result = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getAdditionals`
      );
      setAdditionals(result.response.data);
    }
    getAdditionals();
  }, []);
  const watchFile = watch("file");

  useEffect(() => {
    if (watchFile && watchFile[0]) {
      const file = watchFile[0];
      setPreview(URL.createObjectURL(file)); // Create a URL for the preview
    }
  }, [watchFile]);
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    let addressId = searchParams.get("address");
    let token = localStorage.getItem("zxcvbnm");
    if (!token) {
      router.push("/login");
    }
    let userDetails = await verifyUser(token);
    let { id, full } = userDetails;
    formData.append("userId", id); // Replace with actual userId
    formData.append("addressId", addressId);
    formData.append("transactionId", data.transactionId);
    formData.append("file", data.file[0]);
    formData.append("paymentMode", "easypaisa");
    formData.append("paymentState", "pending");

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/paymentHandlerOthers`,
      {
        method: "POST",
        body: formData,
      }
    );
    let result = await request.json();
    if (request.status == 200) {
      setApiResponse(result.message);
      setPaymentId(result.paymentId);
      setLoading(false);
    } else if (request.status == 500) {
      setApiResponse(result.error);
      setLoading(false);
    } else if (request.status != 200) {
      setApiResponse(result.error);
      setLoading(false);
    }
    reset();
  };

  return (
    <div className="p-2">
      {apiResponse != "" ? (
        <section id="modaaaaal" className="flex justify-center">
          <div className="m-10 flex max-w-lg flex-col items-center rounded-md border px-8 py-10 text-gray-800 shadow-lg">
            <p className="mt-4 text-center text-xl font-bold">
              Payment Response
            </p>
            <p className="mt-2 text-center text-lg">
              {apiResponse && apiResponse} <br></br>
              <span className="truncate font-medium">
                PaymentId: {paymentId && paymentId}
              </span>
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <button
                onClick={() => {
                  setLoading(true);
                  router.push("/order");
                  setLoading(false);
                }}
                className="whitespace-nowrap rounded-md bg-green-500 px-4 py-3 font-medium text-white"
              >
                {loading ? (
                  <div>
                    <span className="flex items-center gap-x-4 rounded-xl px-8 py-3 font-medium text-blue-200">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          r="35"
                          strokeDasharray="164.93361431346415 56.97787143782138"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                          ></animateTransform>
                        </circle>
                      </svg>
                    </span>
                  </div>
                ) : (
                  "Go View Your Order"
                )}
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  router.push("/");
                  setLoading(false);
                }}
                className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
              >
                {loading ? (
                  <div>
                    <span className="flex items-center gap-x-4 rounded-xl px-8 py-3 font-medium text-blue-200">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          r="35"
                          strokeDasharray="164.93361431346415 56.97787143782138"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                          ></animateTransform>
                        </circle>
                      </svg>
                    </span>
                  </div>
                ) : (
                  "Go To Home"
                )}
              </button>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      <div className="flex justify-center">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
          Payment By Easypaisa
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:w-[32rem] shadow-blue-100 mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
          <div className="px-8 py-6 bg-gray-100">
            <p className="text-lg font-semibold text-gray-700">
              Our Details Transfer Money In Given Account And Fill The Form !{" "}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Account Number:{" "}
              <span className="font-normal">
                {Array.isArray(additionals) &&
                  additionals.length > 0 &&
                  additionals[0]?.accountNumberEasyPaisa}
              </span>
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-700">
              Name:{" "}
              <span className="font-normal">
                {" "}
                {Array.isArray(additionals) &&
                  additionals.length > 0 &&
                  additionals[0]?.accountHolderEasyPaisa}
              </span>
            </p>
          </div>
          <input
            type="text"
            className="my-3 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 sm:text-base md:text-lg"
            placeholder="Enter Your Transaction ID"
            {...register("transactionId", {
              required: "Transaction ID is required",
            })}
          />
          {errors.transactionId && (
            <p className="text-red-500 text-sm">
              {errors.transactionId.message}
            </p>
          )}

          <div className="relative bg-blue-600 py-6 pl-8 text-xl font-semibold uppercase tracking-wider text-white">
            Upload Screenshot
          </div>
          <div className="space-y-4 px-8 py-10">
            <div className="flex flex-col items-center justify-center rounded-lg border-4 border-dashed px-4 py-10">
              <Image
                src={uploader}
                height={100}
                width={100}
                alt="uploader icon"
                priority={false}
                style={{ rotate: "270deg" }}
              />
              <p className="mt-4 text-center text-lg font-medium text-gray-800">
                Please Upload Your Transaction Screenshot !
                <label className="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                  <input
                    className=""
                    type="file"
                    name="file"
                    id=""
                    {...register("file", {
                      required: "Screenshot is required",
                      validate: {
                        isFileSelected: (files) =>
                          files?.length > 0 || "Screenshot is required",
                      },
                    })}
                  />
                  browse
                </label>
              </p>
              {errors.file && (
                <p className="text-red-500 text-sm">{errors.file.message}</p>
              )}
            </div>
            {/* Preview Section */}
            {preview && (
              <div>
                <p>Image Preview:</p>
                <img src={preview} alt="Preview" className="max-w-xs" />
              </div>
            )}

            <button
              type="submit"
              className="mt-4 rounded-full bg-blue-600 px-10 py-2 font-semibold text-white"
            >
              {loading ? (
                <div>
                  <span className="flex items-center gap-x-4 rounded-xl px-8 py-3 font-medium text-blue-200">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        r="35"
                        strokeDasharray="164.93361431346415 56.97787143782138"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          repeatCount="indefinite"
                          dur="1s"
                          values="0 50 50;360 50 50"
                          keyTimes="0;1"
                        ></animateTransform>
                      </circle>
                    </svg>
                  </span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
