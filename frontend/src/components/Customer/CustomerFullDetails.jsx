import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  IndianRupee,
  Trash2,
  Wallet,
  BadgeCheck,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  getCustomerById,
  payInterest,
  payPrincipal,
  deleteCustomer,
} from "../../services/customerService";

import StatusBadge from "./StatusBadge";

const CustomerFullDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [customer, setCustomer] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const res = await getCustomerById(id);

      setCustomer(res.data);
    
    } catch (err) {
      toast.error("Unable to load customer");
    } finally {
      setLoading(false);
    }
  };

 const handleInterest = async () => {
  const result = await Swal.fire({
    title: "Receive Interest Payment?",
    text: "This will reset the customer's interest amount.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Receive",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await payInterest(id);

    toast.success(res.message);

    loadCustomer();
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to receive interest"
    );
  }
};

 const handlePrincipal = async () => {
  const result = await Swal.fire({
    title: "Close Loan?",
    text: "Principal payment will close this loan permanently.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Close Loan",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await payPrincipal(id);

    toast.success(res.message);

    loadCustomer();
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to close loan"
    );
  }
};

  const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Delete Customer?",
    html: `
      <p>This action cannot be undone.</p>
      <b style="color:red;">All customer images and records will be deleted.</b>
    `,
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await deleteCustomer(id);

    toast.success(res.message);

    navigate("/customers");
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Delete failed"
    );
  }
};

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );

  if (!customer)
    return (
      <div className="text-center mt-20">
        Customer not found
      </div>
    );
    return (
  <div className="min-h-screen bg-gray-100 p-4 md:p-6">

    {/* Header */}

    <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              {customer.customerName}
            </h1>

            <p className="text-gray-500">
              {customer.customerId}
            </p>

          </div>

        </div>

        <StatusBadge
          status={customer.loanStatus}
        />

      </div>

    </div>

    {/* Customer Profile */}

    <div className="grid lg:grid-cols-3 gap-6">

      {/* Left */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <img
          src={customer.proof.customerPhoto.url}
          alt=""
          className="w-40 h-40 rounded-full object-cover border-4 border-yellow-500 mx-auto"
        />

        <h2 className="text-center text-2xl font-bold mt-4">
          {customer.customerName}
        </h2>

        <p className="text-center text-gray-500">
          {customer.customerId}
        </p>

        <div className="mt-8 space-y-5">

          <div className="flex gap-3">

            <Phone />

            <span>
              {customer.mobileNumber}
            </span>

          </div>

          <div className="flex gap-3">

            <MapPin />

            <span>

              {customer.address.street},

              <br />

              {customer.address.city},

              {customer.address.district}

            </span>

          </div>

          <div className="flex gap-3">

            <Calendar />

            <span>

              {new Date(
                customer.loanDate
              ).toLocaleDateString("en-IN")}

            </span>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="lg:col-span-2 space-y-6">

        {/* Personal Details */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-5">

            Personal Information

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <p className="text-gray-500">
                Father Name
              </p>

              <h3 className="font-semibold">
                {customer.fatherName}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Mother Name
              </p>

              <h3 className="font-semibold">
                {customer.motherName || "-"}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Proof Type
              </p>

              <h3 className="font-semibold">
                {customer.proof.proofType}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Card Number
              </p>

              <h3 className="font-semibold">
                {customer.proof.cardNumber}
              </h3>

            </div>

          </div>

        </div>

        {/* Uploaded Images */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-5">

            Uploaded Images

          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            <div>

              <img
                src={customer.proof.proofPhoto.url}
                className="rounded-xl h-40 w-full object-cover"
              />

              <p className="text-center mt-2 text-sm">

                Proof

              </p>

            </div>

            <div>

              <img
                src={customer.proof.customerPhoto.url}
                className="rounded-xl h-40 w-full object-cover"
              />

              <p className="text-center mt-2 text-sm">

                Customer

              </p>

            </div>

            <div>

              <img
                src={
                  customer.proof
                    .customerSignature.url
                }
                className="rounded-xl h-40 w-full object-cover"
              />

              <p className="text-center mt-2 text-sm">

                Signature

              </p>

            </div>

            <div>

              <img
                src={
                  customer.jewelleryPhoto.url
                }
                className="rounded-xl h-40 w-full object-cover"
              />

              <p className="text-center mt-2 text-sm">

                Jewellery

              </p>

            </div>

          </div>

        </div>

                {/* Loan Details */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-5">
            Loan Information
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-blue-50 rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Loan Amount
              </p>

              <h2 className="text-2xl font-bold text-blue-600 mt-2">
                ₹ {Number(customer.loanAmount || 0).toLocaleString("en-IN")}
              </h2>

            </div>

            <div className="bg-green-50 rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Principal
              </p>

              <h2 className="text-2xl font-bold text-green-600 mt-2">
                ₹ {Number(customer.principalAmount || 0).toLocaleString("en-IN")}
              </h2>

            </div>

            <div className="bg-red-50 rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Interest
              </p>

              <h2 className="text-2xl font-bold text-red-600 mt-2">
                ₹ {Number(customer.interestAmount || 0).toLocaleString("en-IN")}
              </h2>

            </div>

            <div className="bg-yellow-50 rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Outstanding
              </p>

              <h2 className="text-2xl font-bold text-yellow-700 mt-2">
                ₹{" "}
                {(
                  Number(customer.principalAmount || 0) +
                  Number(customer.interestAmount || 0)
                ).toLocaleString("en-IN")}
              </h2>

            </div>

          </div>

        </div>

        {/* Jewellery Details */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-5">
            Jewellery Details
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            <div>

              <p className="text-gray-500">
                Item
              </p>

              <h3 className="font-semibold capitalize">
                {customer.item}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Item Type
              </p>

              <h3 className="font-semibold">
                {customer.itemType}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Purity
              </p>

              <h3 className="font-semibold">
                {customer.purity}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Weight
              </p>

              <h3 className="font-semibold">
                {customer.itemWeight} g
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Number of Items
              </p>

              <h3 className="font-semibold">
                {customer.numberOfItems}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Current Gold Value
              </p>

              <h3 className="font-semibold">
                ₹ {Number(customer.currentValue || 0).toLocaleString("en-IN")}
              </h3>

            </div>

          </div>

          <div className="mt-6">

            <p className="text-gray-500">
              Description
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mt-2">

              {customer.description || "No Description"}

            </div>

          </div>

        </div>

        {/* Interest History */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-5">

            Interest Payment History

          </h2>

          {customer.interestPaymentDetails.length === 0 ? (

            <div className="text-gray-500 text-center py-8">

              No Interest Payments Yet

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-3 text-left">
                      From Date
                    </th>

                    <th className="p-3 text-left">
                      Paid Date
                    </th>

                    <th className="p-3 text-right">
                      Amount
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {customer.interestPaymentDetails.map(
                    (payment, index) => (

                      <tr
                        key={index}
                        className="border-b"
                      >

                        <td className="p-3">

                          {new Date(
                            payment.fromDate
                          ).toLocaleDateString("en-IN")}

                        </td>

                        <td className="p-3">

                          {new Date(
                            payment.paidDate
                          ).toLocaleDateString("en-IN")}

                        </td>

                        <td className="p-3 text-right font-semibold text-green-600">

                          ₹{" "}

                          {Number(
                            payment.amountPaid
                          ).toLocaleString("en-IN")}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

                {/* Action Buttons */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-6">
            Loan Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Interest Payment */}

            <button
              onClick={handleInterest}
              disabled={
                customer.loanStatus === "Closed" ||
                Number(customer.interestAmount) <= 0
              }
              className={`flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold transition ${
                customer.loanStatus === "Closed" ||
                Number(customer.interestAmount) <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <Wallet size={20} />

              Pay Interest

            </button>

            {/* Principal Payment */}

            <button
              onClick={handlePrincipal}
              disabled={customer.loanStatus === "Closed"}
              className={`flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold transition ${
                customer.loanStatus === "Closed"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <BadgeCheck size={20} />

              Pay Principal

            </button>

            {/* Delete */}

            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              <Trash2 size={20} />

              Delete Customer

            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default CustomerFullDetails;