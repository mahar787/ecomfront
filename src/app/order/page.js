"use client";
import React, { useEffect, useState } from "react";
import postReq from "../Utilities/postReq";
import verifyUser from "../Utilities/verifyUser";
import Image from "next/image";
import delivery from "../../../public/delivery.gif";
import check from "../../../public/check.png";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("zxcvbnm");
    if (token) {
      verifyUser(token)
        .then(async (data) => {
          let { id, full } = data;
          let result = await postReq(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getAllOrders`,
            { id }
          );
          if (result.statusCode == 200) {
            setOrders(result.response.data.reverse());
          }
        })
        .catch((error) => {
          console.log("Error in getting orders", error);
        });
    }
  }, []);
  return (
    <section className="px-2 w-[100vw] min-h-[100vh]">
      <div className="w-screen">
        <div className="mx-auto mt-8 max-w-screen-lg px-2">
          <div className="mt-6 overflow-hidden rounded-xl border shadow">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td
                    width="30%"
                    className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                  >
                    Order
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    OrderId
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Date
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Amount
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Status
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(orders) &&
                  orders.length > 0 &&
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => router.push(`/order/${order._id}`)}
                    >
                      {/* Status */}
                      <td className="py-4 px-6 text-sm font-bold text-gray-900">
                        <Image
                          src={order.state === "deliverd" ? check : delivery}
                          height={100}
                          width={100}
                          priority={false}
                          alt={
                            order.state === "deliverd"
                              ? "Delivered icon"
                              : "Delivery in progress"
                          }
                        />
                        <div className="mt-1 lg:hidden">
                          <p className="font-normal text-gray-500">
                            {order.orderDate.split("T")[0]}
                          </p>
                        </div>
                      </td>

                      {/* Order Date */}
                      <td className="hidden py-4 px-6 text-sm font-normal text-gray-500 lg:table-cell">
                        {order._id}
                      </td>
                      <td className="hidden py-4 px-6 text-sm font-normal text-gray-500 lg:table-cell">
                        {order.orderDate.split("T")[0]}
                      </td>

                      {/* Total Amount */}
                      <td className="py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                        {order.totalAmount} ./Rs
                        <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-xs font-medium text-white lg:hidden">
                          {order.status}
                        </div>
                      </td>

                      {/* Order Status */}
                      <td className="hidden py-4 px-6 text-sm font-normal text-gray-500 lg:table-cell">
                        <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                          {order.status}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
