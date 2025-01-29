"use client";
import React from "react";
import oops from "../../../../public/oops.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <section className="w-[100vw] min-h-[100vh]">
      <div className="flex justify-center">
        <div className="m-10 flex max-w-lg flex-col items-center rounded-md border px-8 py-10 text-gray-800 shadow-lg">
          <Image
            src={oops}
            width={100}
            height={100}
            priority={false}
            alt="Oops Icon"
          />
          <p className="mt-4 text-center text-xl font-bold">
            Order Not Confirmed
          </p>
          <p className="mt-2 text-center text-lg">
            Unfortunately ! Payment Unsucessful Or Any Other Problem Occur.{" "}
          </p>
          <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <button
              onClick={() => {
                router.push("/");
              }}
              className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
            >
              Go To Home Page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
