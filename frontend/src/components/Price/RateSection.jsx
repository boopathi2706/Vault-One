import React from "react";
import { Coins, Gem } from "lucide-react";
import PriceCard from "./PriceCard";

const RateSection = ({
  title,
  rates = {},
  type = "gold",
}) => {
  const isGold = type.toLowerCase() === "gold";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      {/* Section Header */}

      <div className="flex items-center gap-3 mb-6">

        <div
          className={`p-3 rounded-xl text-white ${
            isGold
              ? "bg-yellow-500"
              : "bg-slate-500"
          }`}
        >
          {isGold ? (
            <Coins size={28} />
          ) : (
            <Gem size={28} />
          )}
        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="text-gray-500 text-sm">
            Current market rates per gram
          </p>

        </div>

      </div>

      {/* Price Cards */}

      {Object.keys(rates).length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No price data available.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Object.entries(rates).map(
            ([purity, rate]) => (
              <PriceCard
                key={purity}
                purity={purity}
                rate={rate}
                type={type}
              />
            )
          )}

        </div>
      )}

    </div>
  );
};

export default RateSection;