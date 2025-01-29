"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../adminComponents/navbar";
import { useForm } from "react-hook-form";
import postReq from "@/app/Utilities/postReq";
import getReq from "@/app/Utilities/getReq";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/managementLogin");
    }
  }, []);
  useEffect(() => {
    async function getAdditionals() {
      try {
        let result = await getReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getAdditionals`
        );
        if (result.statusCode == 200) console.log(result.response.data[0]);
        setValue("deliveryFee", result.response.data[0].deliveryCharges);
        setValue(
          "easyPaisaName",
          result.response.data[0].accountHolderEasyPaisa
        );
        setValue(
          "easyPaisaNumber",
          result.response.data[0].accountNumberEasyPaisa
        );
        setValue("jazzCashName", result.response.data[0].accountHolderJazzCash);
        setValue(
          "jazzCashNumber",
          result.response.data[0].accountNumberJazzCash
        );
      } catch (error) {
        console.log("Error in fetching additionals !");
      }
    }
    getAdditionals();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/addAdditionals`,
        data
      );
      if (result.statusCode == 200) {
        setValue("deliveryFee", result.response.data[0].deliveryCharges);
        setValue(
          "easyPaisaName",
          result.response.data[0].accountHolderEasyPaisa
        );
        setValue(
          "easyPaisaNumber",
          result.response.data[0].accountNumberEasyPaisa
        );
        setValue("jazzCashName", result.response.data[0].accountHolderJazzCash);
        setValue(
          "jazzCashNumber",
          result.response.data[0].accountNumberJazzCash
        );
      }
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      reset();
      console.log("Error in updating additionals");
    }
  };
  return (
    <section>
      <NavBar />
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex">
              <div className="w-full flex-col justify-center items-center gap-4 flex">
                <h2 className="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
                  Additionals Of Ecommerce
                </h2>
              </div>
              <div className="w-full flex-col justify-start items-start gap-6 flex">
                <div className="w-full flex-col justify-start items-start gap-8 flex">
                  <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-gray-600 text-base font-medium leading-relaxed">
                        Delivery Fee
                      </label>
                      <input
                        type="number"
                        {...register("deliveryFee")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="250"
                      />
                    </div>
                  </div>
                  <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-gray-600 text-base font-medium leading-relaxed">
                        Account Holder Name EasyPaisa
                      </label>
                      <input
                        type="text"
                        {...register("easyPaisaName")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="EasyPaisa Account Holder Name"
                      />
                    </div>
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-gray-600 text-base font-medium leading-relaxed">
                        Account Number EasyPaisa
                      </label>
                      <input
                        type="text"
                        {...register("easyPaisaNumber")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="EasyPaisa Account Number"
                      />
                    </div>
                  </div>
                  <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-gray-600 text-base font-medium leading-relaxed">
                        Account Holder Name JazzCash
                      </label>
                      <input
                        type="text"
                        {...register("jazzCashName")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="JazzCash Account Holder Name"
                      />
                    </div>
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-gray-600 text-base font-medium leading-relaxed">
                        Account Number JazzCash
                      </label>
                      <input
                        type="text"
                        {...register("jazzCashNumber")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="JazzCash Account Number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mx-auto sm:w-fit w-full px-9 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-700 rounded-xl shadow text-white text-lg font-semibold"
              >
                {loading ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default page;
