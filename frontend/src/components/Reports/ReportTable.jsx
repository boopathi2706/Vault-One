import React from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentBadge from "./PaymentBadge";

const ReportTable = ({ payments = [] }) => {
  const navigate = useNavigate();

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-500">
          No Payment History Found
        </h2>

        <p className="text-gray-400 mt-2">
          There are no payment records available.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ========================= */}
      {/* Desktop Table */}
      {/* ========================= */}

      <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-yellow-500 text-white">

              <tr>

                <th className="px-5 py-4 text-left">
                  Customer ID
                </th>

                <th className="px-5 py-4 text-left">
                  Customer Name
                </th>

                <th className="px-5 py-4 text-left">
                  Mobile
                </th>

                <th className="px-5 py-4 text-left">
                  Item
                </th>

                <th className="px-5 py-4 text-center">
                  Payment
                </th>

                <th className="px-5 py-4 text-right">
                  Interest
                </th>

                <th className="px-5 py-4 text-right">
                  Principal
                </th>

                <th className="px-5 py-4 text-center">
                  Paid Date
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment, index) => (

                <tr
                  key={index}
                  className={`border-b hover:bg-yellow-50 transition ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >

                  <td className="px-5 py-4 font-semibold">
                    {payment.customer.customerId}
                  </td>

                  <td className="px-5 py-4">
                    {payment.customer.customerName}
                  </td>

                  <td className="px-5 py-4">
                    {payment.customer.mobileNumber}
                  </td>

                  <td className="px-5 py-4">

                    <div>

                      <p className="font-semibold capitalize">
                        {payment.customer.item}
                      </p>

                      <p className="text-xs text-gray-500">
                        {payment.customer.itemType}
                      </p>

                      <p className="text-xs text-gray-500">
                        {payment.customer.purity} •{" "}
                        {payment.customer.itemWeight} g
                      </p>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-center">
                    <PaymentBadge
                      type={payment.paymentType}
                    />
                  </td>

                  <td className="px-5 py-4 text-right font-semibold text-green-600">

                    {payment.paymentType === "Interest"
                      ? `₹ ${Number(
                          payment.amountPaid
                        ).toLocaleString("en-IN")}`
                      : "-"}

                  </td>

                  <td className="px-5 py-4 text-right font-semibold text-blue-600">

                    {payment.paymentType === "Principal"
                      ? `₹ ${Number(
                          payment.principalAmount
                        ).toLocaleString("en-IN")}`
                      : "-"}

                  </td>

                  <td className="px-5 py-4 text-center">

                    {new Date(
                      payment.paidDate
                    ).toLocaleDateString("en-IN")}

                  </td>

                  <td className="px-5 py-4 text-center">

                    <button
                      onClick={() =>
                        navigate(
                          `/customer/${payment.customer.id}`
                        )
                      }
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
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

        {payments.map((payment, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
          >

            {/* Header */}

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-lg font-bold text-gray-800">
                  {payment.customer.customerName}
                </h2>

                <p className="text-gray-500 text-sm">
                  {payment.customer.customerId}
                </p>

              </div>

              <PaymentBadge
                type={payment.paymentType}
              />

            </div>

            {/* Customer Details */}

            <div className="mt-5 space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Mobile</span>
                <span>{payment.customer.mobileNumber}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Item</span>
                <span className="capitalize">
                  {payment.customer.item}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Item Type</span>
                <span>{payment.customer.itemType}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Purity</span>
                <span>{payment.customer.purity}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Weight</span>
                <span>
                  {payment.customer.itemWeight} g
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Interest
                </span>

                <span className="font-semibold text-green-600">

                  {payment.paymentType === "Interest"
                    ? `₹ ${Number(
                        payment.amountPaid
                      ).toLocaleString("en-IN")}`
                    : "-"}

                </span>

              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Principal
                </span>

                <span className="font-semibold text-blue-600">

                  {payment.paymentType === "Principal"
                    ? `₹ ${Number(
                        payment.principalAmount
                      ).toLocaleString("en-IN")}`
                    : "-"}

                </span>

              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Paid Date
                </span>

                <span>
                  {new Date(
                    payment.paidDate
                  ).toLocaleDateString("en-IN")}
                </span>

              </div>

            </div>

            {/* Footer */}

            <button
              onClick={() =>
                navigate(
                  `/customer/${payment.customer.id}`
                )
              }
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
            >
              <Eye size={18} />

              View Customer

            </button>

          </div>

        ))}

      </div>

    </>
  );
};

export default ReportTable;