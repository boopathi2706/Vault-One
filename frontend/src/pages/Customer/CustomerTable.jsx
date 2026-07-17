import React from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerCard from "./CustomerCard";
import StatusBadge from "./StatusBadge";

const CustomerTable = ({ customers = [] }) => {
  const navigate = useNavigate();

  if (!customers.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-500">
          No Customers Found
        </h2>

        <p className="text-gray-400 mt-2">
          There are no customer records available.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ================= Desktop ================= */}

      <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto max-h-[70vh]">

          <table className="min-w-full">

            <thead className="sticky top-0 bg-yellow-500 text-white z-10">

              <tr>

                <th className="px-4 py-4">#</th>

                <th className="px-4 py-4">
                  Photo
                </th>

                <th className="px-4 py-4 text-left">
                  Customer ID
                </th>

                <th className="px-4 py-4 text-left">
                  Name
                </th>

                <th className="px-4 py-4 text-center">
                  Item
                </th>

                <th className="px-4 py-4 text-left">
                  Mobile
                </th>

                <th className="px-4 py-4 text-right">
                  Principal
                </th>

                <th className="px-4 py-4 text-right">
                  Interest
                </th>

                <th className="px-4 py-4 text-right">
                  Outstanding
                </th>

                <th className="px-4 py-4 text-center">
                  Status
                </th>

                <th className="px-4 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {customers.map((customer, index) => (

                <tr
                  key={customer._id}
                  className={`border-b hover:bg-yellow-50 transition duration-200 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >

                  <td className="px-4 py-4 text-center">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4">

                    <img
                      src={
                        customer?.proof?.customerPhoto?.url ||
                        "/default-user.png"
                      }
                      alt={customer.customerName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />

                  </td>

                  <td className="px-4 py-4 font-semibold">
                    {customer.customerId}
                  </td>

                  <td className="px-4 py-4">
                    {customer.customerName}
                  </td>

                  <td className="px-4 py-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        customer.item === "gold"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {customer.item}
                    </span>

                  </td>

                  <td className="px-4 py-4">
                    {customer.mobileNumber}
                  </td>

                  <td className="px-4 py-4 text-right font-semibold">

                    ₹{" "}

                    {Number(
                      customer.principalAmount || 0
                    ).toLocaleString("en-IN")}

                  </td>

                  <td className="px-4 py-4 text-right text-red-600 font-semibold">

                    ₹{" "}

                    {Number(
                      customer.interestAmount || 0
                    ).toLocaleString("en-IN")}

                  </td>

                  <td className="px-4 py-4 text-right text-blue-600 font-bold">

                    ₹{" "}

                    {(
                      Number(customer.principalAmount || 0) +
                      Number(customer.interestAmount || 0)
                    ).toLocaleString("en-IN")}

                  </td>

                  <td className="px-4 py-4 text-center">

                    <StatusBadge
                      status={customer.loanStatus}
                    />

                  </td>

                  <td className="px-4 py-4 text-center">

                    <button
                        onClick={() => navigate(`/customer/${customer._id}`)}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition hover:scale-105"
                    >
                      <Eye size={18} />

                      View

                    </button>

                  </td>

                </tr>

              ))}
                          </tbody>

          </table>

        </div>

      </div>

      {/* ========================= */}
      {/* Mobile & Tablet View */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">

        {customers.map((customer) => (

          <CustomerCard
            key={customer._id}
            customer={customer}
          />

        ))}

      </div>

    </>
  );
};

export default CustomerTable;