"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import registrationImage from "../../../public/registration.jpg";
import { useForm } from "react-hook-form";
import ErrorComponent from "../components/errorComponent";
import postReq from "../Utilities/postReq";
import AlertComponent from "../components/alertComponent";
const page = () => {
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    setLoading(true);
    await postReq(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addUser`, data)
      .then((data) => {
        if (data.statusCode == 200) {
          setApiResponse(data.response.data);
          setLoading(false);
          router.push("/login");
        }
        if (data.statusCode != 200) {
          setResError(data.response.data);
        }
        reset();
      })
      .catch((error) => {
        setLoading(false);
        reset();
        console.log("Error in Sending Request for user creation", error);
      });
  };
  return (
    <section className="w-screen h-auto bg-gray-100">
      {resError && <ErrorComponent message={resError} />}
      {apiResponse && <AlertComponent message={apiResponse} />}
      <div className="flex h-auto w-full my-8 items-center justify-center  ">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg  shadow-lg  sm:flex">
          <div className="m-2 mx-auto max-w-64 overflow-hidden rounded-2xl  bg-cover bg-center  sm:w-2/5">
            <Image
              alt="Registration Image"
              layout=""
              src={registrationImage}
              loading="lazy"
              objectFit="cover"
            />
          </div>
          <div className="w-full sm:w-3/5">
            <div className="p-8">
              <h1 className="text-3xl font-black ">Sign up</h1>
              <p className="mt-2 mb-5 text-base leading-tight ">
                Create an account to get access to unlimited products
              </p>
              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative mt-2 w-full">
                  <input
                    type="text"
                    id="name"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm  focus:border-blue-300 focus:outline-none focus:ring-0"
                    placeholder=" "
                    {...register("name", {
                      required: "Your Name is Required",
                    })}
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none  px-2 text-sm  duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                  >
                    {" "}
                    Enter Your name{" "}
                  </label>
                  {errors.name && (
                    <div className="text-red-600 ">{errors.name.message}</div>
                  )}
                </div>
                <div className="relative mt-2 w-full">
                  <input
                    type="text"
                    id="username"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm  focus:border-blue-300 focus:outline-none focus:ring-0"
                    placeholder=" "
                    {...register("username", {
                      required: "Uersname is Required",
                    })}
                  />
                  <label
                    htmlFor="username"
                    className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none  px-2 text-sm  duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                  >
                    {" "}
                    Enter Your username{" "}
                  </label>
                  {errors.username && (
                    <div className="text-red-600 ">
                      {errors.username.message}
                    </div>
                  )}
                </div>
                <div className="relative mt-2 w-full">
                  <input
                    type="text"
                    id="password"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm  focus:border-blue-300 focus:outline-none focus:ring-0"
                    placeholder=" "
                    {...register("password", {
                      required: "Password is Required",
                    })}
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none  px-2 text-sm  duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                  >
                    {" "}
                    Enter Your Password
                  </label>
                </div>
                {errors.password && (
                  <div className="text-red-600 ">{errors.password.message}</div>
                )}
                <input
                  className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3  shadow-lg hover:bg-blue-400"
                  type="submit"
                  value={loading ? "Submitting" : "Create Account"}
                  disabled={loading}
                  style={{ cursor: loading ? "not-allowed" : "pointer" }}
                />
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm ">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-bold text-blue-600 no-underline hover:text-blue-400"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
