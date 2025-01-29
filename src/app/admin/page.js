import React from "react";
import NavBar from "./adminComponents/navbar";
const page = () => {
  return (
    <section>
      <NavBar />
      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to the Admin Page
            </h1>
            <p className="text-gray-600 text-lg">
              This is where you can manage and control all aspects of your
              application. From managing users to additionals, you have all the
              tools you need right here.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;
