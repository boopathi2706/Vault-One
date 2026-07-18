import React from "react";
import {
  IndianRupee,
  Weight,
  Calculator,
} from "lucide-react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-3xl shadow-lg p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-green-600 p-3 rounded-xl text-white">
          <Calculator size={28} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Calculation Result
          </h2>

          <p className="text-gray-500">
            Estimated current market value
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Current Rate */}

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <IndianRupee
            className="mx-auto text-blue-600"
            size={35}
          />

          <p className="text-gray-500 mt-3">
            Current Rate
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-2">
            ₹ {Number(result.rate).toLocaleString("en-IN")}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Per Gram
          </p>

        </div>

        {/* Weight */}

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <Weight
            className="mx-auto text-yellow-600"
            size={35}
          />

          <p className="text-gray-500 mt-3">
            Weight
          </p>

          <h2 className="text-3xl font-bold text-yellow-700 mt-2">
            {result.weight} g
          </h2>

        </div>

        {/* Total */}

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <Calculator
            className="mx-auto text-green-600"
            size={35}
          />

          <p className="text-gray-500 mt-3">
            Total Value
          </p>

          <h2 className="text-3xl font-bold text-green-700 mt-2">
            ₹{" "}
            {Number(result.total).toLocaleString(
              "en-IN"
            )}
          </h2>

        </div>

      </div>

    </div>
  );
};

export default ResultCard;