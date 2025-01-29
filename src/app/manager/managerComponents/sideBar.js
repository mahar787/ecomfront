"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
const SideBar = () => {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/loginManagement");
    }
  }, []);
  const [userLogin, setUserLogin] = useState(false);
  const [login, setLogin] = useState("Login");
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/loginManagement");
    }
    if (token) {
      setUserLogin(true);
      setLogin("Logout");
    } else {
      setUserLogin(false);
      setLogin("Login");
    }
  }, [setUserLogin]);
  const pathName = usePathname();
  return (
    <section>
      <header className="mb-2 shadow">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-6 sm:mx-auto sm:flex-row">
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute right-4 top-5 cursor-pointer sm:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav className="peer-checked:mt-8 peer-checked:max-h-32 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all sm:ml-24 sm:max-h-full sm:flex-row sm:items-start">
            <h2 className="sr-only" id="header-navigation">
              Trendify Management
            </h2>
            <ul className="flex flex-col cursor-pointer items-center sm:flex-row">
              <li
                className={`sm:mr-12  ${
                  pathName == "/manager" ? "font-bold" : ""
                }`}
                onClick={() => {
                  router.push("/manager");
                }}
              >
                Home
              </li>
              <li
                className={`sm:mr-12
                 ${pathName.includes("/manager/orders") ? "font-bold" : ""}`}
                onClick={() => {
                  router.push("/manager/orders");
                }}
              >
                Orders
              </li>
              <li
                className={`text-gray-800 sm:mr-12
                  ${
                    pathName.includes("/manager/addProduct") ? "font-bold" : ""
                  }`}
                onClick={() => {
                  router.push("/manager/addProduct");
                }}
              >
                Add Product
              </li>
              <li
                className={`text-gray-800 sm:mr-12 ${
                  pathName.includes("/manager/addCategory") ? "font-bold" : ""
                }`}
                onClick={() => {
                  router.push("/manager/addCategory");
                }}
              >
                Add Category
              </li>
              <li
                className={`text-gray-800 sm:mr-12
                ${
                  pathName.includes("/manager/deleteProduct") ? "font-bold" : ""
                }`}
                onClick={() => {
                  router.push("/manager/deleteProduct");
                }}
              >
                Delete Product
              </li>
              {userLogin == true ? (
                <li
                  className={`text-gray-800 sm:mr-12`}
                  onClick={() => {
                    localStorage.removeItem("asdfghjkl");
                    setUserLogin(false);
                    router.push("/managementLogin");
                  }}
                >
                  {login}
                </li>
              ) : (
                <li
                  className={`text-gray-800 sm:mr-12`}
                  onClick={() => {
                    router.push("/managementLogin");
                  }}
                >
                  {login}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </section>
  );
};

export default SideBar;
