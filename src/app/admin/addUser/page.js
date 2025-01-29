"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../adminComponents/navbar";
import { useForm } from "react-hook-form";
import postReq from "@/app/Utilities/postReq";
import AlertComponent from "@/app/components/alertComponent";
import ErrorComponent from "@/app/components/errorComponent";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/managementLogin");
    }
  }, []);
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
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/admin/addUser`,
        data
      );
      setLoading(false);
      if (result.statusCode === 200) {
        setApiResponse(result.response.message);
      } else {
        setResError(result.response.message);
      }
      reset();
    } catch (error) {
      setLoading(false);
      reset();
      console.log("Error in creating management user!");
    }
  };
  return (
    <section className="w-[100vw] min-h-[100vh]">
      <NavBar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative my-5 space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100 m-10"
      >
        {apiResponse && <AlertComponent message={apiResponse} />}
        {resError && <ErrorComponent message={resError} />}
        <h1 className="text-xl font-semibold lg:text-2xl">Create User</h1>
        <p className="pb-4 text-gray-500">Create New User Here</p>

        <div>
          <label className=""> Name </label>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: "Name is required !" })}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
        </div>
        {errors.name && (
          <div className="text-red-500 ">{errors.name.message}</div>
        )}
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
          <label className=""> Designation :</label>
          <select
            {...register("designation", {
              required: "Please Select User's Designation !",
            })}
          >
            <option>Select Designation</option>
            <option value={"manager"}>Manager</option>
            <option value={"admin"}>Admin</option>
          </select>
        </div>
        {errors.designation && (
          <div className="text-red-500 ">{errors.designation.message}</div>
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
            {loading ? "Creating" : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default page;
