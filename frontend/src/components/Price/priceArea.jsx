import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PriceHeader from "./PriceHeader";
import RateSection from "./RateSection";
import PriceCalculator from "./PriceCalculator";

import { getPrices } from "../../services/priceService";

const PriceArea = () => {
  const [priceData, setPriceData] = useState({
    date: "",
    goldRates: {},
    silverRates: {},
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      setLoading(true);

      const res = await getPrices();
     console.log(res);
      setPriceData(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load price data."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="text-xl font-semibold animate-pulse">
          Loading Today's Prices...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-6">

      {/* Banner */}

      <PriceHeader
        date={priceData.date}
        goldRates={priceData.goldRates}
        silverRates={priceData.silverRates}
      />

      {/* Gold & Silver Rates */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

        <RateSection
          title="Gold Rates"
          rates={priceData.goldRates}
          type="gold"
        />

        <RateSection
          title="Silver Rates"
          rates={priceData.silverRates}
          type="silver"
        />

      </div>

      {/* Calculator */}

      <div className="mt-8">

        <PriceCalculator
          goldRates={priceData.goldRates}
          silverRates={priceData.silverRates}
        />

      </div>

    </div>
  );
};

export default PriceArea;