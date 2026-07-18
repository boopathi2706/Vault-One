import React from "react";
import {
  Coins,
  Gem,
  CalendarDays,
} from "lucide-react";

const PriceHeader = ({
  date,
  goldRates = {},
  silverRates = {},
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "--";

    return new Date(dateString).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 rounded-3xl shadow-xl p-6 lg:p-8 text-white">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

        {/* Left */}

        <div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Today's Gold & Silver Rates
          </h1>

          <p className="mt-2 text-yellow-100 text-sm sm:text-base">
            Updated daily with the latest market prices.
          </p>

          <div className="flex items-center gap-2 mt-4">

            <CalendarDays size={20} />

            <span className="font-medium">
              Updated :
            </span>

            <span>
              {formatDate(date)}
            </span>

          </div>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">

          {/* Gold */}

          <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">

            <Coins
              size={40}
              className="mx-auto mb-3"
            />

            <h2 className="text-lg font-bold">
              Gold
            </h2>

            <p className="text-sm mt-2">
              {Object.keys(goldRates).length} Rates
            </p>

          </div>

          {/* Silver */}

          <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">

            <Gem
              size={40}
              className="mx-auto mb-3"
            />

            <h2 className="text-lg font-bold">
              Silver
            </h2>

            <p className="text-sm mt-2">
              {Object.keys(silverRates).length} Rates
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PriceHeader;