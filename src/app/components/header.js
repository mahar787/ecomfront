"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import verifyUser from "../Utilities/verifyUser";
import postReq from "../Utilities/postReq";
import Link from "next/link";
const Header = () => {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState("Login");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("zxcvbnm");
    if (token) {
      setUserLogin("Logout");
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
  }, [setUserLogin]);
  useEffect(() => {
    if (searchTerm) {
      const fetchSuggestions = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getSearchSuggestions?query=${searchTerm}`
          );
          let result = await res.json();
          setSuggestions(result.suggestions.reverse());
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);
  function logout() {
    localStorage.removeItem("zxcvbnm");
    setUserLogin("Login");
  }
  function login() {
    router.replace("/login");
  }
  return (
    <section className="w-[100vw]">
      <nav className="flex px-3 my-3 py-2 justify-between border-b items-center">
        <div>
          <h1 className="font-extrabold text-2xl">Trendify</h1>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-2xl">
          <div className="flex items-center">
            <input
              className="min-w-80 bg-gray-100 p-2 focus:border-2 focus:rounded-md focus:border-gray-300 focus:outline-none"
              type="search"
              placeholder="Search Products Here !"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            ></input>
            {suggestions &&
            Array.isArray(suggestions) &&
            suggestions.length > 0 ? (
              <div
                className="bg-gray-50 border-2 max-h-80 min-w-40 p-2 flex flex-col"
                style={{
                  position: "absolute",
                  top: "11vh",
                  zIndex: "20",
                  overflowY: "auto",
                }}
              >
                {suggestions &&
                Array.isArray(suggestions) &&
                suggestions.length > 0
                  ? suggestions.map((suggestion) => {
                      let a = suggestion.split(" ");
                      return (
                        <a
                          className="border-b-2 border-gray-300"
                          href={`/products?page=1&search=${a[0]}`}
                          key={suggestion}
                        >
                          {suggestion}
                        </a>
                      );
                    })
                  : ""}
              </div>
            ) : (
              ""
            )}
            <div className="mx-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3">
          <Link href="/" className="linking">
            Home
          </Link>
          <Link href="/order" className="linking">
            Orders
          </Link>
          <Link href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="black"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1h1.11a.5.5 0 0 1 .49.39L2.89 3H14.5a.5.5 0 0 1 .49.605l-1.5 6A.5.5 0 0 1 13 10H4a.5.5 0 0 1-.49-.39L1.61 2H.5a.5.5 0 0 1-.5-.5zM4.415 9h8.17l1.2-4.8H3.215L4.415 9zM5.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
            </svg>
          </Link>
          <p>
            <button
              className="px-3 py-1 rounded-md border"
              onClick={() => {
                userLogin === "Logout" ? logout() : login();
              }}
            >
              {userLogin}
            </button>
          </p>
        </div>
      </nav>
    </section>
  );
};

export default Header;
