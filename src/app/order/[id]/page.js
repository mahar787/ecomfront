"use client";
import React, { useEffect, useState } from "react";
import verifyUser from "../../Utilities/verifyUser";
import postReq from "../../Utilities/postReq";
import Image from "next/image";
const page = ({ params }) => {
  const [orders, setOrders] = useState([]);
  let unwrappedParams = React.use(params);
  useEffect(() => {
    let orderId = unwrappedParams.id;
    async function getOrder() {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getOrders`,
        { orderId }
      );
      setOrders(result.response.data);
    }
    getOrder();
  }, []);
  return (
    <section>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Your Order
          </h2>

          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="w-full px-3 min-[400px]:px-6">
              {Array.isArray(orders.orderItems) && orders.orderItems.length > 0
                ? orders.orderItems.map((order) => {
                    return (
                      <div
                        key={order._id}
                        className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                      >
                        <div className="img-box max-lg:w-full">
                          <img
                            src={order.product.images[0].imageUrl}
                            width={100}
                            height={100}
                            priority={false}
                            alt={order.product.name}
                            className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                          />
                        </div>
                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div className="">
                                <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                  {order.product.name}
                                </h2>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                  By: {order.product.brand}
                                </p>
                                <div className="flex items-center ">
                                  <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    {order.sizes && order.sizes.length > 0
                                      ? "Sizes:"
                                      : ""}{" "}
                                    {order.sizes &&
                                      Array.isArray(order.sizes) &&
                                      order.sizes.map((size, i) => {
                                        return (
                                          <span
                                            key={i}
                                            className="text-gray-500"
                                          >
                                            {size.toUpperCase()}&nbsp;
                                          </span>
                                        );
                                      })}
                                  </p>
                                  <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    {order.colors && order.colors.length > 0
                                      ? "Colors:"
                                      : ""}{" "}
                                    {order.colors &&
                                      Array.isArray(order.colors) &&
                                      order.colors.map((size, i) => {
                                        return (
                                          <span
                                            key={i}
                                            className="text-gray-500"
                                          >
                                            {size.toUpperCase()}&nbsp;
                                          </span>
                                        );
                                      })}
                                  </p>

                                  <p className="font-medium text-base leading-7 text-black ">
                                    Qty:{" "}
                                    <span className="text-gray-500">
                                      {order.quantity}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-5">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    price
                                  </p>
                                  <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                    {order.product.retailPrice}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    Status
                                  </p>
                                  <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                    {orders.status}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                    Order Date
                                  </p>
                                  <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    {orders.orderDate.split("T")[0]}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                  Order Id {orders._id}{" "}
                </p>
              </div>
              <p className="font-semibold text-lg text-black py-6">
                Total Price:{" "}
                <span className="text-indigo-600">
                  {" "}
                  {orders.totalAmount} ./Rs
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;
