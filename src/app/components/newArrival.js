"use client";

import { useEffect, useState } from "react";
import getReq from "../Utilities/getReq";
import Link from "next/link";

const NewArrival = () => {
  const [newArrival, setNewArrival] = useState([]);
  useEffect(() => {
    async function getNewArrival() {
      try {
        let result = await getReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getNewArrival`
        );
        if (result.statusCode === 200) {
          setNewArrival(result.response.data);
          console.log(result.response.data);
        }
      } catch (error) {
        console.log("Error in fetching new arrival product.");
      }
    }
    getNewArrival();
  }, []);
  return (
    <section className="flex justify-center">
      <Link
        className=""
        href={`/viewProduct/${
          newArrival &&
          Array.isArray(newArrival) &&
          newArrival.length > 0 &&
          newArrival[0]._id
        }`}
      >
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <p className="text-3xl font-medium text-blue-500 ">
            Featured Product
          </p>

          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

            <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <img
                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src={
                  newArrival &&
                  Array.isArray(newArrival) &&
                  newArrival.length > 0
                    ? newArrival[1].imageUrl
                    : undefined
                }
                alt="client photo"
              />

              <div className="mt-2 md:mx-6">
                <div>
                  <p className="text-xl font-medium tracking-tight text-white">
                    {newArrival &&
                      Array.isArray(newArrival) &&
                      newArrival.length > 0 &&
                      newArrival[0].name}
                  </p>
                  <p className="text-blue-200 ">
                    Price:{" "}
                    {newArrival &&
                      Array.isArray(newArrival) &&
                      newArrival.length > 0 &&
                      newArrival[0].retailPrice}
                    ./Rs
                  </p>
                </div>

                <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                  {" "}
                  {newArrival &&
                    Array.isArray(newArrival) &&
                    newArrival.length > 0 &&
                    newArrival[0].description}
                  .
                </p>

                <div className="flex items-center justify-between mt-6 md:justify-start">
                  <button
                    title="left arrow"
                    className="p-2 text-white transition-colors duration-300 border rounded-xl rtl:-scale-x-100 hover:bg-blue-400"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Link>
    </section>
  );
};

export default NewArrival;
