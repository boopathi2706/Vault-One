import React from "react";
import { Search } from "lucide-react";

const CustomerFilter = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  const buttons = [
    {
      label: "All",
      value: "all",
      color: "bg-blue-600",
    },
    {
      label: "Active",
      value: "active",
      color: "bg-green-600",
    },
    {
      label: "Overdue",
      value: "overdue",
      color: "bg-red-600",
    },
    {
      label: "Closed",
      value: "closed",
      color: "bg-gray-700",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

      <div className="flex flex-col lg:flex-row gap-5 justify-between">

        {/* Search */}

        <div className="relative w-full lg:w-96">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by ID, Name or Mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-xl
              border
              border-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-500
            "
          />

        </div>

        {/* Status Buttons */}

        <div className="flex flex-wrap gap-3">

          {buttons.map((btn) => (

            <button
              key={btn.value}
              onClick={() => setStatus(btn.value)}
              className={`
                px-5
                py-2
                rounded-xl
                font-semibold
                transition
                duration-300

                ${
                  status === btn.value
                    ? `${btn.color} text-white shadow-lg`
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {btn.label}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
};

export default CustomerFilter;