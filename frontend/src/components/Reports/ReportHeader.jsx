import React from "react";
import {
  ReceiptIndianRupee,
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

const ReportHeader = ({ payments = [] }) => {
  const totalPayments = payments.length;

  const totalInterest = payments
    .filter((payment) => payment.paymentType === "Interest")
    .reduce(
      (sum, payment) => sum + (payment.amountPaid || 0),
      0
    );

  const totalPrincipal = payments
    .filter((payment) => payment.paymentType === "Principal")
    .reduce(
      (sum, payment) =>
        sum + (payment.principalAmount || 0),
      0
    );

  const formatCurrency = (amount) =>
    `₹ ${Number(amount).toLocaleString("en-IN")}`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
      {/* Total Payments */}

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm opacity-90">
              Total Payments
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalPayments}
            </h2>

          </div>

          <ReceiptIndianRupee size={45} />

        </div>

      </div>

      {/* Interest */}

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm opacity-90">
              Interest Collection
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {formatCurrency(totalInterest)}
            </h2>

          </div>

          <Wallet size={45} />

        </div>

      </div>

      {/* Principal */}

      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm opacity-90">
              Principal Collection
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {formatCurrency(totalPrincipal)}
            </h2>

          </div>

          <BadgeIndianRupee size={45} />

        </div>

      </div>
    </div>
  );
};

export default ReportHeader;