"use client";
import postReq from "@/app/Utilities/postReq";
import verifyUser from "@/app/Utilities/verifyUser";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlertComponent from "@/app/components/alertComponent";
import check from "../../../../public/check.png";
import Image from "next/image";
const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [resError, setResError] = useState("");
  const [apiRes, setApiRes] = useState("");
  const address = searchParams.get("address") || "";
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("zxcvbnm");
    let address = searchParams.get("address");
    if (token) {
      verifyUser(token)
        .then(async (data) => {
          let { id, full } = data;
          let result = await postReq(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addOrder`,
            {
              id,
              address,
              payment: "paid",
              paymentMode: "card",
            }
          );
          if (result.statusCode == 200) {
            setApiRes(result.response.message);
          }
        })
        .catch((error) => {
          console.log("Success page error", error);
        });
    }
  }, []);
  return (
    <section className="w-[100vw] min-h-[100vh]">
      {apiRes && <AlertComponent message={apiRes} />}
      <div className="flex justify-center">
        <div className="m-10 flex max-w-lg flex-col items-center rounded-md border px-8 py-10 text-gray-800 shadow-lg">
          <Image
            src={check}
            width={100}
            height={100}
            priority={false}
            alt="Tick Icon"
          />
          <p className="mt-4 text-center text-xl font-bold">
            Order Confirmation
          </p>
          <p className="mt-2 text-center text-lg">{apiRes && apiRes} </p>
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
                "View Your Order"
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
                "Go To Home Page"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
