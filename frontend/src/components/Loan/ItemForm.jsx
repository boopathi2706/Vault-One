import React from "react";

const ItemForm = ({
  formData,
  handleChange,
  handleFileChange,
  nextStep,
  prevStep,
}) => {
  const validate = () => {
    if (
      !formData.item ||
      !formData.itemType ||
      !formData.numberOfItems ||
      !formData.itemWeight ||
      !formData.purity ||
      !formData.jewelleryPhoto
    ) {
      alert("Please fill all required fields.");
      return;
    }

    nextStep();
  };

  const goldPurity = ["18K", "22K", "24K"];

  const silverPurity = [
    "80%",
    "90%",
    "92.5%",
    "99.9%",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Heading */}

      <h2 className="text-2xl font-bold text-gray-800">
        Jewellery Details
      </h2>

      <p className="text-gray-500 mt-1 mb-8">
        Enter pledged jewellery details.
      </p>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Gold / Silver */}

        <div>

          <label className="font-medium">
            Item *
          </label>

          <select
            name="item"
            value={formData.item}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          >
            <option value="">
              Select Item
            </option>

            <option value="Gold">
              Gold
            </option>

            <option value="Silver">
              Silver
            </option>

          </select>

        </div>

        {/* Item Type */}

        <div>

          <label className="font-medium">
            Item Type *
          </label>

          <input
            type="text"
            name="itemType"
            value={formData.itemType}
            onChange={handleChange}
            placeholder="Ring / Chain / Necklace..."
            className="w-full mt-2 border rounded-xl p-3"
          />

        </div>

        {/* Number Of Items */}

        <div>

          <label className="font-medium">
            Number Of Items *
          </label>

          <input
            type="number"
            name="numberOfItems"
            value={formData.numberOfItems}
            onChange={handleChange}
            placeholder="1"
            className="w-full mt-2 border rounded-xl p-3"
          />

        </div>

        {/* Weight */}

        <div>

          <label className="font-medium">
            Weight (grams) *
          </label>

          <input
            type="number"
            step="0.001"
            name="itemWeight"
            value={formData.itemWeight}
            onChange={handleChange}
            placeholder="12.500"
            className="w-full mt-2 border rounded-xl p-3"
          />

        </div>

        {/* Purity */}

        <div>

          <label className="font-medium">
            Purity *
          </label>

          <select
            name="purity"
            value={formData.purity}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          >
            <option value="">
              Select Purity
            </option>

            {(formData.item === "Gold"
              ? goldPurity
              : silverPurity
            ).map((purity) => (
              <option
                key={purity}
                value={purity}
              >
                {purity}
              </option>
            ))}

          </select>

        </div>

        {/* Jewellery Photo */}

        <div>

          <label className="font-medium">
            Jewellery Photo *
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileChange(
                e,
                "jewelleryPhoto"
              )
            }
            className="w-full mt-2"
          />

        </div>

      </div>

      {/* Description */}

      <div className="mt-6">

        <label className="font-medium">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter jewellery description..."
          className="w-full mt-2 border rounded-xl p-3 resize-none"
        />

      </div>

      {/* Buttons */}

      <div className="flex justify-between mt-10">

        <button
          onClick={prevStep}
          className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
        >
          ← Previous
        </button>

        <button
          onClick={validate}
          className="px-8 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
        >
          Next →
        </button>

      </div>

    </div>
  );
};

export default ItemForm;