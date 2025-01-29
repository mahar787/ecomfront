"use client";
import getReq from "@/app/Utilities/getReq";
import React, { useEffect, useState } from "react";
import NavBar from "../adminComponents/navbar";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/managementLogin");
    }
  }, []);
  useEffect(() => {
    async function getPayments() {
      let result = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getPayments`
      );
      if (result.statusCode == 200) {
        setPayments(result.response.data);
        console.log(result.response.data);
      }
    }
    getPayments();
  }, []);
  return (
    <section>
      <NavBar />
      {Array.isArray(payments) &&
        payments.length > 0 &&
        payments.map((payment) => {
          return (
            <div className="m-5" key={payment._id}>
              <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
                <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                  <h3 className="text-sm text-gray-600">
                    {payment.paymentMode}
                  </h3>
                  <a
                    href="#"
                    className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                  >
                    {" "}
                    Order Id :{payment.orderId}{" "}
                  </a>
                  <p className="overflow-hidden pr-7 text-sm">
                    Transaction Id: {payment?.transactionId}
                  </p>
                  <p className="overflow-hidden pr-7 text-sm">
                    User Id: {payment?.userId}
                  </p>

                  <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <div className="">
                      Status:
                      <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                        {" "}
                        {payment.paymentStatus}{" "}
                      </span>
                    </div>
                    <div className="">
                      Total Amount:
                      <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                        {payment.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default page;
