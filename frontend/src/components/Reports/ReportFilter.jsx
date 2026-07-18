import React from "react";
import { Search } from "lucide-react";

const ReportFilter = ({
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

      <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">

        {/* Filter Buttons */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setFilter("All")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              filter === "All"
                ? "bg-yellow-500 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All Payments
          </button>

          <button
            onClick={() => setFilter("Interest")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              filter === "Interest"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Interest Payments
          </button>

          <button
            onClick={() => setFilter("Principal")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              filter === "Principal"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Principal Payments
          </button>

        </div>

        {/* Search */}

        <div className="relative w-full lg:w-96">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Customer ID or Name..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </div>

      </div>

    </div>
  );
};

export default ReportFilter;