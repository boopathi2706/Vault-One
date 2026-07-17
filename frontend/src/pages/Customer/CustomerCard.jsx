import React from "react";
import {
  Phone,
  Eye,
  IndianRupee,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const CustomerCard = ({ customer }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Header */}
      <div className="bg-yellow-500 p-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <img
            src={
              customer?.proof?.customerPhoto?.url ||
              "/default-user.png"
            }
            alt="Customer"
            className="w-14 h-14 rounded-full object-cover border-2 border-white"
          />

          <div>

            <h2 className="font-bold text-white text-lg">
              {customer.customerName}
            </h2>

            <p className="text-yellow-100 text-sm">
              {customer.customerId}
            </p>

          </div>

        </div>

        <StatusBadge status={customer.loanStatus} />

      </div>

      {/* Body */}

      <div className="p-5 space-y-4">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Item
          </span>

          <span className="font-semibold capitalize">
            {customer.item}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Purity
          </span>

          <span className="font-semibold">
            {customer.purity}
          </span>

        </div>

        <div className="flex items-center gap-2">

          <Phone size={18} className="text-gray-500" />

          {customer.mobileNumber}

        </div>

        <div className="flex items-center gap-2">

          <Calendar size={18} className="text-gray-500" />

          {new Date(customer.loanDate).toLocaleDateString("en-IN")}

        </div>

        {/* Amount Cards */}

        <div className="grid grid-cols-2 gap-3 mt-4">

          <div className="bg-green-50 rounded-xl p-3">

            <p className="text-xs text-gray-500">
              Principal
            </p>

            <p className="font-bold text-green-700 flex items-center">
              <IndianRupee size={16} />
              {Number(
                customer.principalAmount || 0
              ).toLocaleString("en-IN")}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-3">

            <p className="text-xs text-gray-500">
              Interest
            </p>

            <p className="font-bold text-red-600 flex items-center">
              <IndianRupee size={16} />
              {Number(
                customer.interestAmount || 0
              ).toLocaleString("en-IN")}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="p-4 border-t">

        <button
          onClick={() =>
            navigate(`/customer/${customer._id}`)
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <Eye size={18} />
          View Full Details
        </button>

      </div>

    </div>
  );
};

export default CustomerCard;