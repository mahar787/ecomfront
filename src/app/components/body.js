"use client";
import React from "react";
import { Inter } from "next/font/google";
import ProgressBar from "./Progressbar";
import Header from "./header";
import CategoriesHeader from "./categories";
import SideBar from "../manager/managerComponents/sideBar";
import Footer from "./footer";
import { usePathname } from "next/navigation";
const geistSans = Inter({
  subsets: ["latin"],
});
export const metadata = {
  title: "Trendify",
  description: "Trendy Finds, Just a Click Away!",
};

const Body = ({ children }) => {
  const pathname = usePathname();

  return (
    <body className={`${geistSans.className} antialiased`}>
      {(pathname && pathname.includes("/manager")) ||
      pathname.includes("/managementLogin") ||
      pathname.includes("/admin") ? null : (
        <Header />
      )}
      {(pathname && pathname.includes("/manager")) ||
      pathname.includes("/managementLogin") ||
      pathname.includes("/admin") ? null : (
        <CategoriesHeader />
      )}
      <ProgressBar />
      {children}
      {(pathname && pathname.includes("/manager")) ||
      pathname.includes("/managementLogin") ||
      pathname.includes("/admin") ? null : (
        <Footer />
      )}
    </body>
  );
};

export default Body;
