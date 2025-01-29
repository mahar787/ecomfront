"use client";
import postReq from "@/app/Utilities/postReq";
import React, { useEffect, useState } from "react";
import SideBar from "../managerComponents/sideBar";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/managementLogin");
    }
    async function getAllOrders() {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getOrders`,
        { token }
      );
      if (result.statusCode === 200) {
        setOrders(result.response.data.reverse());
      }
    }
    getAllOrders();
  }, []);
  return (
    <section>
      <SideBar />
      {Array.isArray(orders) &&
        orders.length > 0 &&
        orders.map((order) => {
          return (
            <div className="m-5" key={order._id}>
              <div
                onClick={() => {
                  router.push(`/manager/orders/${order._id}`);
                }}
                className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto"
              >
                <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                  <h3 className="text-sm text-gray-600">{order.paymentMode}</h3>
                  <a
                    href="#"
                    className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                  >
                    {" "}
                    User Id :{order.userId}{" "}
                  </a>
                  <p className="overflow-hidden pr-7 text-sm">
                    Date: {order.orderDate.split("T")[0]}
                  </p>
                  <p className="overflow-hidden pr-7 text-sm">
                    Time: {order.orderDate.split("T")[1].split(".")[0]}
                  </p>

                  <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <div className="">
                      Status:
                      <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                        {" "}
                        {order.paymentStatus}{" "}
                      </span>
                    </div>
                    <div className="">
                      Total Amount:
                      <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                        {order.totalAmount}
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
