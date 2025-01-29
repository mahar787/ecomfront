"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import verifyUser from "../Utilities/verifyUser";
import ErrorComponent from "../components/errorComponent";
import postReq from "../Utilities/postReq";
import Image from "next/image";
import cod from "../../../public/cod.png";
import card from "../../../public/card.png";
import jazzcash from "../../../public/jazzcash.png";
import easypaisa from "../../../public/easypaisa.png";
import spinner from "../../../public/spinner.gif";
import { loadStripe } from "@stripe/stripe-js";
import getReq from "../Utilities/getReq";
const page = () => {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [resError, setResError] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [addres, setAddres] = useState("");
  const [loading, setLoading] = useState(false);
  const [additionals, setAdditionals] = useState([]);
  useEffect(() => {
    async function getAdditionals() {
      let result = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getAdditionals`
      );
      setAdditionals(result.response.data);
    }
    getAdditionals();
  }, []);
  useEffect(() => {
    let token = localStorage.getItem("zxcvbnm");
    let addresss = searchParams.get("address") || "";
    setAddres(addresss);
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
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price and delivery charges
    let calculatedTotalPrice = 0;
    let hasLargeItem = false;

    cartItems.forEach((item) => {
      calculatedTotalPrice += item.price * item.quantity;

      // Check for sizeType
      if (item.productDetails.sizeType === "large") {
        hasLargeItem = true;
      }
    });

    // Calculate delivery charges
    const calculatedDeliveryCharges = hasLargeItem
      ? additionals[0]?.deliveryCharges + additionals[0]?.deliveryCharges // One large item + flat charge for small items
      : additionals[0]?.deliveryCharges; // Flat charge for small items only

    setTotalPrice(Number(calculatedTotalPrice));
    console.log(calculatedDeliveryCharges);
    setDeliveryCharges(Number(calculatedDeliveryCharges));
  }, [cartItems]);
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
  );
  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    // Create checkout session
    let address = searchParams.get("address") || "";
    let token = localStorage.getItem("zxcvbnm");

    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: token, address: address }),
        }
      );

      const session = await res.json();

      // Redirect user to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: session.id });
      setLoading(false);
    } else {
      router.push("/login");
      setLoading(false);
    }
  };
  async function handleCod() {
    setLoading(true);
    let address = searchParams.get("address") || "";
    let token = localStorage.getItem("zxcvbnm");
    let data = {
      token: token,
      addressId: address,
      paymentMode: "cod",
      paymentState: "pending",
    };
    let codResponse = await postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/paymentHandlerCod`,
      data
    );
    if (codResponse.statusCode == 200) {
      router.push("/order");
      setLoading(false);
    }
  }

  return (
    <section className="w-[100vw] min-h-[100vh]">
      {resError && <ErrorComponent message={resError} />}
      {loading ? (
        <section
          className="w-[100vw] flex justify-center items-center min-h-screen h-[200vh] absolute z-20"
          style={{
            backgroundColor: "rgba(0,0,0,.1)",
            backdropFilter: "blur(3px)",
          }}
        >
          <Image
            src={spinner}
            height={130}
            width={130}
            className="rounded-full"
            alt="Spinner"
          />
        </section>
      ) : (
        ""
      )}
      <div className="flex p-2 justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Checkout page
        </h1>
      </div>

      <div className="grid sm:px-10 lg:grid-cols-1 lg:px-20 xl:px-32">
        <div className="px-4 pt-8"></div>
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item) => {
              console.log(item);
              return (
                <div
                  key={item._id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <Image
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.productImages[0].imageUrl}
                    alt={item.productDetails.name}
                    height={200}
                    width={200}
                    priority={false}
                  />

                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">
                      {item.productDetails.name}
                    </span>
                    <span className="float-right text-gray-400">
                      Quantity: {item.quantity}
                    </span>
                    <p className="text-lg font-bold">{totalPrice}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="my-5 gap-2 flex flex-col ">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium">Total Price</h2>
            <p className="font-semibold text-lg"> Rs. {totalPrice}</p>
          </div>
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium mt-2">Delivery Charges</h2>
            <p className="font-semibold text-lg">Rs. {deliveryCharges}</p>
          </div>
          <div className="flex items-center justify-between px-4 border-t-2">
            <h2 className="text-xl font-bold mt-4">Grand Total</h2>
            <p className="font-bold text-lg">
              Rs. {totalPrice + deliveryCharges}
            </p>
          </div>
        </div>

        <p className="mt-8 text-lg font-medium">Select Payment Methods</p>
        <form className=" grid gap-6 my-5">
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_1"
              type="radio"
              name="radio"
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              onClick={() => {
                handleCod();
              }}
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_1"
            >
              <Image
                src={cod}
                width={50}
                height={50}
                priority={false}
                alt="cashOnDelivery's Logo"
              />

              <div className="ml-5">
                <span className="mt-2 font-semibold">Cash On Delivery</span>
              </div>
            </label>
          </div>
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_2"
              type="radio"
              name="radio"
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_2"
              onClick={() => {
                handleCheckout();
              }}
            >
              <Image
                src={card}
                width={50}
                height={50}
                priority={false}
                alt="Card's Logo"
              />

              <div className="ml-5">
                <span className="mt-2 font-semibold">Card</span>
              </div>
            </label>
          </div>
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_3"
              type="radio"
              name="radio"
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_3"
              onClick={() => {
                router.push(`/paymentEasy?address=${addres}`);
              }}
            >
              <Image
                src={easypaisa}
                width={50}
                height={50}
                priority={false}
                alt="Easypaisa's Logo"
              />

              <div className="ml-5">
                <span className="mt-2 font-semibold">EasyPaisa</span>
              </div>
            </label>
          </div>
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_4"
              type="radio"
              name="radio"
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_4"
              onClick={() => {
                router.push(`/paymentJazz?address=${addres}`);
              }}
            >
              <Image
                src={jazzcash}
                width={50}
                height={50}
                priority={false}
                alt="Jazzcash's Logo"
              />
              <div className="ml-5">
                <span className="mt-2 font-semibold">JazzCash</span>
              </div>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default page;
