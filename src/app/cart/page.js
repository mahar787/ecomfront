"use client";
import React, { useState, useEffect } from "react";
import postReq from "../Utilities/postReq";
import verifyUser from "../Utilities/verifyUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [resError, setResError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("zxcvbnm");
    if (token) {
      verifyUser(token)
        .then(async (data) => {
          let { id, full } = data;
          let result = await postReq(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getCartItems`,
            {
              id,
            }
          );
          if (result.statusCode == 200) {
            setCartItems(result.response.data);
            console.log(result.response.data);
          }
          if (result.statusCode != 200) {
            setResError(result.response.data);
          }
        })
        .catch((error) => {
          console.log("Error in getting cart items", error);
        });
    }
  }, []);
  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);
  async function removeProduct(id) {
    let newArr = cartItems.filter((item) => {
      return item.productId != id;
    });
    setCartItems(newArr);
    await postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/removeProductFromCart.js`,
      { id }
    );
  }
  async function increaseQuantity(id) {
    let newArr = cartItems.filter((item) => {
      return item.productId == id ? (item.quantity += 1) : item.quantity;
    });
    setCartItems(newArr);
    postReq(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/increaseQuantity`, {
      id,
    });
  }
  async function decreaseQuantity(id) {
    let newArr = cartItems.filter((item) => {
      if (item.quantity <= 1) return;
      return item.productId == id ? (item.quantity -= 1) : item.quantity;
    });
    setCartItems(newArr);
    postReq(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/decreaseQuantity`, {
      id,
    });
  }
  return (
    <section className="bg-gray-200 p-4 ">
      <div className="">
        {resError && <ErrorComponent message={resError} />}
      </div>
      <section className=" relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Shopping Cart
          </h2>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item, i) => {
              return (
                <div key={i}>
                  <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                    <div className="col-span-12 lg:col-span-2 img box">
                      <img
                        src={item.productImages[0].imageUrl}
                        width={200}
                        height={200}
                        alt={item.productDetails.name}
                        className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                      <div className="flex items-center justify-between w-full mb-4">
                        <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                          {item.productDetails.name}
                        </h5>
                        <button
                          onClick={() => {
                            removeProduct(item.productId);
                          }}
                          className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                        >
                          <svg
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                              cx="17"
                              cy="17"
                              r="17"
                              fill=""
                            />

                            <path
                              className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                              d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                              stroke="#EF4444"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                        {item.productDetails.description}{" "}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <button
                            disabled={item.quantity == 1 ? true : false}
                            onClick={() => {
                              item.quantity == 1
                                ? ""
                                : () => {
                                    decreaseQuantity(item.productId);
                                  };
                            }}
                            className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                          >
                            {" "}
                            <svg
                              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.5 9.5H13.5"
                                stroke=""
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="number"
                            className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
                            placeholder={item.quantity}
                          />
                          <button
                            onClick={() => {
                              increaseQuantity(item.productId);
                            }}
                            className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                          >
                            <svg
                              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.75 9.5H14.25M9 14.75V4.25"
                                stroke=""
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                          {item.price * item.quantity}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
              Subtotal
            </h5>

            <div className="flex items-center justify-between gap-3 ">
              <h6 className="font-manrope font-bold text-2xl leading-10 text-indigo-600">
                {totalPrice} ./Rs
              </h6>
            </div>
          </div>
          <div className="max-lg:max-w-lg max-lg:mx-auto">
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
              Shipping taxes, and discounts calculated at checkout
            </p>
            <button
              onClick={() => {
                setLoading(true);
                router.push("/address");
                setLoading(false);
              }}
              className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 "
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
                "Checkout"
              )}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Cart;
