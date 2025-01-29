import Image from "next/image";
import main from "../../public/main.png";
import Testimonial from "./components/testimonial";
import NewArrival from "./components/newArrival";
import ProductsHolder from "./components/ProductsHolder";
import bg from "../../public/bg.png";
import HomePageButton from "./components/homePageButton";

export default function Home() {
  return (
    <>
      <main
        className="mainBgImg flex flex-col justify-between rounded-2xl m-3"
        style={{
          height: "80vh",
          width: "98vw",
        }}
      >
        <section
          style={{
            backgroundColor: "rgba(0,0,0,.2)",
            backdropFilter: "blur(3px)",
          }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-50 my-6 mx-4">
            Trendify
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-50 my-6 mx-4">
            Trendy Finds, Just a Click Away!
          </h1>
          <div className="flex justify-center py-4">
            <HomePageButton />
          </div>
        </section>
      </main>
      <div className="flex mx-3">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl my-3 ">
          Best Selling Products
        </h1>
      </div>
      <ProductsHolder />
      <div className="bg-white flex justify-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-blue-300">
          <q> New Arrival </q>
        </h1>
      </div>
      <NewArrival />
    </>
  );
}
