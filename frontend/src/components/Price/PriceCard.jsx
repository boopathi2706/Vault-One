import React from "react";
import { Coins, Gem } from "lucide-react";

const PriceCard = ({ purity, rate, type = "gold" }) => {
  const isGold = type === "gold";

  return (
    <div
      className={`rounded-xl border shadow hover:shadow-lg transition p-3 ${
        isGold
          ? "bg-yellow-50 border-yellow-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">

        <div>
          <p className="text-xs text-gray-500">Purity</p>

          <h3 className="text-xl font-bold text-gray-800">
            {purity}
          </h3>
        </div>

        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isGold ? "bg-yellow-500" : "bg-slate-500"
          }`}
        >
          {isGold ? (
            <Coins size={20} className="text-white" />
          ) : (
            <Gem size={20} className="text-white" />
          )}
        </div>

      </div>

      <hr className="mb-2" />

      <p className="text-xs text-gray-500">
        Rate / Gram
      </p>

      <h2
        className={`text-2xl font-bold mt-1 ${
          isGold ? "text-yellow-700" : "text-slate-700"
        }`}
      >
        ₹ {Number(rate).toFixed(2)}
      </h2>

    </div>
  );
};

export default PriceCard;