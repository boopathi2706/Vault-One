import React, { useEffect, useState } from "react";
import { Calculator } from "lucide-react";
import ResultCard from "./ResultCard";

const PriceCalculator = ({
  goldRates = {},
  silverRates = {},
}) => {
  const [item, setItem] = useState("gold");
  const [purity, setPurity] = useState("");
  const [weight, setWeight] = useState("");

  const [result, setResult] = useState(null);

  const currentRates =
    item === "gold" ? goldRates : silverRates;

  useEffect(() => {
    const keys = Object.keys(currentRates);

    if (keys.length > 0) {
      setPurity(keys[0]);
    }
  }, [item, goldRates, silverRates]);

  const calculatePrice = () => {
    if (!weight || weight <= 0) {
      alert("Enter valid weight.");
      return;
    }

    const rate = Number(currentRates[purity]);

    setResult({
      rate,
      weight: Number(weight),
      total: rate * Number(weight),
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-blue-600 p-3 rounded-xl text-white">

          <Calculator size={28} />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Price Calculator
          </h2>

          <p className="text-gray-500">
            Calculate jewellery value instantly
          </p>

        </div>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Item */}

        <div>

          <label className="block font-medium mb-2">
            Item
          </label>

          <select
            value={item}
            onChange={(e) =>
              setItem(e.target.value)
            }
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="gold">
              Gold
            </option>

            <option value="silver">
              Silver
            </option>

          </select>

        </div>

        {/* Purity */}

        <div>

          <label className="block font-medium mb-2">
            Purity
          </label>

          <select
            value={purity}
            onChange={(e) =>
              setPurity(e.target.value)
            }
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {Object.keys(currentRates).map(
              (key) => (
                <option
                  key={key}
                  value={key}
                >
                  {key}
                </option>
              )
            )}
          </select>

        </div>

        {/* Weight */}

        <div>

          <label className="block font-medium mb-2">
            Weight (grams)
          </label>

          <input
            type="number"
            placeholder="Enter Weight"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Button */}

      <div className="mt-6">

        <button
          onClick={calculatePrice}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Calculate
        </button>

      </div>

      {/* Result */}

      <ResultCard result={result} />

    </div>
  );
};

export default PriceCalculator;