"use client";
import React, { useEffect, useState } from "react";
import getReq from "../Utilities/getReq";
import { useForm } from "react-hook-form";
import postReq from "../Utilities/postReq";
import verifyUser from "../Utilities/verifyUser";
import { useRouter } from "next/navigation";
import AlertComponent from "../components/alertComponent";
import ErrorComponent from "../components/errorComponent";
const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [userAlreadyAddress, setUserAlreadyAddress] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("zxcvbnm");
    if (token) {
      verifyUser(token).then(async (data) => {
        let { id } = data;
        setUserId(id);
        let result = await postReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getAddress`,
          {
            id,
          }
        );
        console.log(result.response.data);
        if (result.statusCode == 200) {
          setUserAlreadyAddress(result.response.data);
        }
      });
    } else {
      router.push("/login");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [resError, setResError] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const onSubmit = async (data) => {
    setLoading(true);
    data.userId = userId;
    let result = await postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addAddress`,
      data
    );
    if (result.statusCode == 200) {
      setApiResponse(result.response.data);
      let address = result.response.payload;
      router.push(`/checkout?address=${encodeURIComponent(address)}`);
      setLoading(false);
      reset();
    } else {
      setResError(result.response.data);
      setLoading(false);
    }
  };
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function getCountries() {
      try {
        let response = await getReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getCountries`
        );
        if (response.statusCode == 200) {
          setCountries(response.response.data);
        }
      } catch (error) {
        console.log("Error in fetching all countries", error);
      }
    }
    getCountries();
  }, []);
  const autofillAddress = (address) => {
    reset({
      fullName: address.fullName || "",
      phoneNumber: address.phoneNumber || "",
      country: address.country || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      address: address.addressLine || "",
      city: address.city || "",
    });
  };
  return (
    <section className="py-24 relative">
      {resError && <ErrorComponent message={resError} />}
      {apiResponse && <AlertComponent message={apiResponse} />}
      <div className="mb-6 mx-5">
        <h1 className="font-bold my-3 text-lg">
          {Array.isArray(userAlreadyAddress) &&
          userAlreadyAddress.length > 0 &&
          userAlreadyAddress
            ? "Already Registered Addresses"
            : null}
        </h1>
        {userAlreadyAddress && userAlreadyAddress.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {userAlreadyAddress.map((address, index) => (
              <button
                key={address._id}
                onClick={() => autofillAddress(address)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded shadow"
              >
                Address {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex">
            <div className="w-full flex-col justify-center items-center gap-4 flex">
              <h2 className="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
                Address Form
              </h2>
              <p className="max-w-4xl text-center text-gray-500 text-base font-normal leading-relaxed">
                Please Fill Your Address And Contact Information Below!
              </p>
            </div>

            {/* Personal Details Section */}
            <div className="w-full flex-col justify-start items-start gap-6 flex">
              <h4 className="text-gray-900 text-xl font-semibold leading-loose">
                Personal Details
              </h4>
              <div className="w-full flex-col justify-start items-start gap-8 flex">
                <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                  {/* Full Name */}
                  <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                    <label
                      htmlFor="fullName"
                      className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                    >
                      Full Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("fullName", {
                        required: "Full Name is required",
                      })}
                      className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                      placeholder="John"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                    <label
                      htmlFor="phoneNumber"
                      className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                    >
                      Phone Number
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                      className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                      placeholder="0300 0000000"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                  {/* Country */}
                  <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                    <label
                      htmlFor="country"
                      className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                    >
                      Country
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("country", {
                        required: "Country is required",
                      })}
                      className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                    >
                      <option value="">Select Country</option>
                      {countries &&
                        countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                    <label
                      htmlFor="state"
                      className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                    >
                      State
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("state", {
                        required: "State is required",
                      })}
                      className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                      placeholder="Punjab"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Postal Code */}
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label
                    htmlFor="postalCode"
                    className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    {...register("postalCode")}
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                    placeholder="00000"
                  />
                </div>

                {/* Address */}
                <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                  <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                    <label
                      htmlFor="address"
                      className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                    >
                      Address
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                      placeholder="Please Enter Your Address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                    <label
                      htmlFor="city"
                      className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                    >
                      City
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("city", {
                        required: "City is required",
                      })}
                      className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                      placeholder="Please Enter Your City Name"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading ? true : false}
              className="mx-auto sm:w-fit w-full px-9 py-3 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex"
            >
              <span className="px-3.5 text-center text-white text-lg font-semibold leading-8">
                {loading ? "Submitting" : "Submit"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default page;
