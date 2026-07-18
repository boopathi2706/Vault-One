import React from "react";
import { Wallet, BadgeIndianRupee } from "lucide-react";

const PaymentBadge = ({ type }) => {
  switch (type) {
    case "Interest":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
          <Wallet size={16} />
          Interest
        </span>
      );

    case "Principal":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
          <BadgeIndianRupee size={16} />
          Principal
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
          Unknown
        </span>
      );
  }
};

export default PaymentBadge;