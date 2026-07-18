import React from "react";

const CustomerForm = ({
  formData,
  handleChange,
  handleFileChange,
  nextStep,
}) => {
  const validate = () => {
    if (
      !formData.customerName ||
      !formData.fatherName ||
      !formData.mobileNumber ||
      !formData.city ||
      !formData.street ||
      !formData.district ||
      !formData.proofType ||
      !formData.cardNumber ||
      !formData.proofPhoto ||
      !formData.customerPhoto ||
      !formData.customerSignature
    ) {
      alert("Please fill all required fields.");
      return;
    }

    nextStep();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        Customer Details
      </h2>

      <p className="text-gray-500 mb-8">
        Enter customer personal information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Customer Name */}

        <div>
          <label className="font-medium">
            Customer Name *
          </label>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Father */}

        <div>
          <label className="font-medium">
            Father's Name *
          </label>

          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Father Name"
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        {/* Mother */}

        <div>
          <label className="font-medium">
            Mother's Name
          </label>

          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            placeholder="Mother Name"
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        {/* Mobile */}

        <div>
          <label className="font-medium">
            Mobile Number *
          </label>

          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        {/* City */}

        <div>
          <label className="font-medium">
            City *
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        {/* District */}

        <div>
          <label className="font-medium">
            District *
          </label>

          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

      </div>

      {/* Street */}

      <div className="mt-6">
        <label className="font-medium">
          Street *
        </label>

        <textarea
          rows="3"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street Address"
          className="w-full mt-2 border rounded-xl p-3"
        />
      </div>

      {/* Proof */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <div>

          <label className="font-medium">
            Proof Type *
          </label>

          <select
            name="proofType"
            value={formData.proofType}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          >
            <option value="">
              Select Proof
            </option>

            <option value="Aadhar Card">
              Aadhar Card
            </option>

            <option value="PAN Card">
              PAN Card
            </option>

          </select>

        </div>

        <div>

          <label className="font-medium">
            Card Number *
          </label>

          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="w-full mt-2 border rounded-xl p-3"
          />

        </div>

      </div>

      {/* Images */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div>

          <label className="font-medium">
            Proof Photo *
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileChange(
                e,
                "proofPhoto"
              )
            }
            className="w-full mt-2"
          />

        </div>

        <div>

          <label className="font-medium">
            Customer Photo *
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileChange(
                e,
                "customerPhoto"
              )
            }
            className="w-full mt-2"
          />

        </div>

        <div>

          <label className="font-medium">
            Signature *
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileChange(
                e,
                "customerSignature"
              )
            }
            className="w-full mt-2"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end mt-10">

        <button
          onClick={validate}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Next →
        </button>

      </div>

    </div>
  );
};

export default CustomerForm;