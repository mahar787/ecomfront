"use client";
import AlertComponent from "@/app/components/alertComponent";
import ErrorComponent from "@/app/components/errorComponent";
import postReq from "@/app/Utilities/postReq";
import React, { useEffect, useState } from "react";
import SideBar from "../../managerComponents/sideBar";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const page = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("asdfghjkl");
    if (!token) {
      router.push("/loginManagement");
    }
  }, []);
  const { register, handleSubmit, setValue } = useForm();
  let unwrappedParams = React.use(params);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [resError, setResError] = useState("");
  const handleImageClick = (url) => {
    setModalImage(url);
    setShowModal(true);
  };

  useEffect(() => {
    async function getOrderDetails(token, orderId) {
      let data = {
        token,
        orderId,
      };
      try {
        let result = await postReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getOrder`,
          data
        );
        if (result.statusCode === 200) {
          setOrder(result.response.data);
          console.log(result.response.data);
        }
      } catch (error) {
        console.log("Error in fetching order details");
      }
    }
    let id = unwrappedParams.id;
    let token = localStorage.getItem("asdfghjkl");
    getOrderDetails(token, id);
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    data.orderId = order[0].order._id;
    let result = await postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/updateOrder`,
      data
    );
    if (result.statusCode === 200) {
      setLoading(false);
      setApiResponse(result.response.message);
      setValue("orderStatus", result.response.orderStatus);
      setValue("paymentStatus", result.response.paymentStatus);
    } else {
      setLoading(false);
      setResError(result.response.message);
    }
  };
  return (
    <section>
      {apiResponse && <AlertComponent message={apiResponse} />}
      {resError && <ErrorComponent message={resError} />}
      <SideBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(order) &&
          order.length > 0 &&
          order.map((data) => {
            return (
              <div
                key={data.order._id}
                className="flex flex-col items-center p-4 bg-gray-50 min-h-screen"
              >
                <h1 className="text-2xl font-bold mb-6">Order Details</h1>
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                  {/* Order Summary */}
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <button className="px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400">
                      {loading ? "Updating ..." : "Update Order"}
                    </button>
                  </div>
                  <div className="mb-4">
                    <p>
                      <strong>Order ID:</strong>{" "}
                      {data.order?.paymentDetails?.orderId}
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(data.order.orderDate).toLocaleString()}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> PKR{" "}
                      {data.order.totalAmount}
                    </p>
                    <p>
                      <strong>Delivery Charges:</strong> PKR{" "}
                      {data.order.deliveryCharges}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <select
                        {...register("orderStatus")}
                        className="bg-gray-200 "
                      >
                        <option defaultValue="pending">
                          {data.order?.status}
                        </option>
                        <option defaultValue="pending" value={"pending"}>
                          Pending
                        </option>
                        <option defaultValue="deliverd" value={"delivered"}>
                          Deliverd
                        </option>
                        <option defaultValue="shipped" value={"shipped"}>
                          Shipped
                        </option>
                        <option defaultValue="cancelled" value={"cancelled"}>
                          Cancelled
                        </option>
                      </select>
                    </p>
                  </div>

                  {/* Payment Details */}
                  <h2 className="text-xl font-semibold mb-4">
                    Payment Details
                  </h2>
                  <div className="mb-4">
                    <p>
                      <strong>Payment Mode:</strong>{" "}
                      {data.order?.paymentDetails?.paymentMode.toUpperCase() ||
                        data.order?.paymentMode.toUpperCase()}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      <select
                        {...register("paymentStatus")}
                        className="bg-gray-200 "
                      >
                        <option defaultValue={data.order.paymentStatus}>
                          {data.order.paymentStatus}
                        </option>
                        <option defaultValue="pending" value={"pending"}>
                          Pending
                        </option>
                        <option defaultValue="paid" value={"paid"}>
                          Paid
                        </option>
                      </select>
                    </p>
                    <p>
                      <strong>Transaction ID:</strong>{" "}
                      {data.order?.paymentDetails?.transactionId}
                    </p>
                    {data.order?.paymentDetails?.imageUrl && (
                      <Image
                        src={data.order?.paymentDetails?.imageUrl}
                        alt="Receipt Image"
                        width={200}
                        height={200}
                        priority={false}
                        className="rounded-md cursor-pointer"
                        onClick={() =>
                          handleImageClick(data.order?.paymentDetails.imageUrl)
                        }
                      />
                    )}
                  </div>

                  {/* Shipping Address */}
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Address
                  </h2>
                  <div className="mb-4">
                    <p>
                      <strong>Name:</strong> {data.order.userId.name}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {data.order.shippingAddress.addressLine}
                    </p>
                    <p>
                      <strong>City:</strong> {data.order.shippingAddress.city}
                    </p>
                    <p>
                      <strong>State:</strong> {data.order.shippingAddress.state}
                    </p>
                    <p>
                      <strong>Country:</strong>{" "}
                      {data.order.shippingAddress.country}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {data.order.shippingAddress.phoneNumber}
                    </p>
                  </div>

                  {/* Order Items */}
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  <div>
                    {data.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-4 mb-4"
                      >
                        <div className="flex items-center">
                          <Image
                            src={item.images[0].imageUrl}
                            alt={item.images[0].altText}
                            width={100}
                            height={100}
                            className="rounded-md mr-4"
                          />
                          <div>
                            <p>
                              <strong>Product:</strong> {item.product.name}
                            </p>
                            <p>
                              <strong>Brand:</strong> {item.product.brand}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {item.product.description}
                            </p>
                            <p>
                              <strong>Price:</strong> PKR{" "}
                              {item.product.retailPrice}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {item.quantity}
                            </p>
                            <p>
                              <strong>Color:</strong> {item.colors.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Modal */}
                {showModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative">
                      <button
                        className="absolute top-2 right-2 text-white text-2xl"
                        onClick={() => setShowModal(false)}
                      >
                        &times;
                      </button>
                      <Image
                        src={modalImage}
                        alt="Large Receipt Image"
                        width={600}
                        height={600}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </form>
    </section>
  );
};

export default page;
