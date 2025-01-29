"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertComponent from "../components/alertComponent";
import ErrorComponent from "../components/errorComponent";
import { useRouter } from "next/navigation";
import postReq from "../Utilities/postReq";
const page = () => {
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState("");
  const [resError, setResError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/managementVerification`,
        data
      );
      if (result.statusCode == 200) {
        let token = result.response.data;
        localStorage.setItem("asdfghjkl", token);
        if (result.response.post == "admin") {
          setLoading(false);
          router.push("/admin");
        }
        if (result.response.post == "manager") {
          setLoading(false);
          router.push("/manager");
        }
      } else {
        setResError(result.response.message);
        setLoading(false);
      }
      reset();
    } catch (error) {
      setLoading(false);
      reset();
      console.log("Error in logging in user!", error);
    }
  };
  return (
    <section className="w-[100vw] min-h-[100vh]">
      {apiResponse && <AlertComponent message={apiResponse} />}
      {resError && <ErrorComponent message={resError} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative my-5 space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100 m-10"
      >
        <h1 className="text-xl font-semibold lg:text-2xl">Login</h1>
        <p className="pb-4 text-gray-500">Sign in to access your account</p>

        <div>
          <label className=""> Username </label>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required !" })}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
        </div>
        {errors.username && (
          <div className="text-red-500 ">{errors.username.message}</div>
        )}
        <div>
          <label className=""> Password </label>
          <input
            type="password"
            placeholder="******"
            {...register("password", { required: "Password is required !" })}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
        </div>
        {errors.password && (
          <div className="text-red-500 ">{errors.password.message}</div>
        )}

        <div>
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            {loading ? "Submitting" : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default page;
