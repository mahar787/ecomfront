"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
const NavBar = () => {
  const pathName = usePathname();
  const router = useRouter();
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
                  pathName == "/admin" ? "font-bold" : ""
                }`}
                onClick={() => {
                  router.push("/admin");
                }}
              >
                Home
              </li>
              <li
                className={`sm:mr-12
                  ${pathName.includes("/admin/payments") ? "font-bold" : ""}`}
                onClick={() => {
                  router.push("/admin/payments");
                }}
              >
                Payments
              </li>
              <li
                className={`text-gray-800 sm:mr-12
                  ${pathName.includes("/admin/addUser") ? "font-bold" : ""}`}
                onClick={() => {
                  router.push("/admin/addUser");
                }}
              >
                Add User
              </li>
              <li
                className={`text-gray-800 sm:mr-12 ${
                  pathName.includes("/admin/additionals") ? "font-bold" : ""
                }`}
                onClick={() => {
                  router.push("/admin/additionals");
                }}
              >
                Additionals
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

export default NavBar;
