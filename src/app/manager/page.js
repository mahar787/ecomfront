import React from "react";
import SideBar from "./managerComponents/sideBar";
const page = () => {
  return (
    <section className="w-[100vw] min-h-[100vh]">
      <SideBar />
      <section className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to the Manager Page
            </h1>
            <p className="text-gray-600 text-lg">
              This is where managers can oversee operations, monitor
              performance, and manage orders efficiently. Your tools are just a
              click away!
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;
