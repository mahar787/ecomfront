import Link from "next/link";
import Image from "next/image";
const ProductsonLandingPage = (props) => {
  return (
    <Link className="" href={`/viewProduct/${props.id}`}>
      <div className="max-w-sm bg-white border linking border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="overflow-hidden w-full h-64">
          {" "}
          {/* Fixed height for consistent sizing */}
          <img
            src={props.image}
            alt={props.altText}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            style={{ height: "18rem", width: "18rem" }}
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Product Name */}
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {props.name}
          </h2>

          {/* Price */}
          <p className="mt-2 text-gray-600 font-medium">
            Price: {props.retailPrice}./Rs
          </p>

          {/* Ratings */}
          <div className="flex items-center mt-2">
            <span>Rating: {props.rating}</span>
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.539 1.118L10 13.011l-3.374 2.455c-.783.57-1.838-.197-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.636 9.39c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.962z"></path>
            </svg>
          </div>

          {/* View Details Button */}
          <button className="mt-4 w-full  font-semibold py-2 hover:bg-gray-200 bg-gray-100 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductsonLandingPage;
