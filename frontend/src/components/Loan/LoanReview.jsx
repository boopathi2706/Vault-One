import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { createCustomer } from "../../services/customerService";

const LoanReview = ({
  formData,
  prevStep,
  resetForm,
  navigate,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      // Customer Details
      data.append("customerName", formData.customerName);
      data.append("fatherName", formData.fatherName);
      data.append("motherName", formData.motherName);
      data.append("mobileNumber", formData.mobileNumber);

      data.append("city", formData.city);
      data.append("street", formData.street);
      data.append("district", formData.district);

      data.append("proofType", formData.proofType);
      data.append("cardNumber", formData.cardNumber);

      // Item Details
      data.append("item", formData.item);
      data.append("itemType", formData.itemType);
      data.append("numberOfItems", formData.numberOfItems);
      data.append("itemWeight", formData.itemWeight);
      data.append("purity", formData.purity);
      data.append("description", formData.description);

      // Loan Details
      data.append("loanAmount", formData.loanAmount);
      data.append("interestRate", formData.interestRate);
      data.append("principalAmount", formData.principalAmount);

      // Images
      data.append("proofPhoto", formData.proofPhoto);
      data.append("customerPhoto", formData.customerPhoto);
      data.append(
        "customerSignature",
        formData.customerSignature
      );
      data.append(
        "jewelleryPhoto",
        formData.jewelleryPhoto
      );

      await createCustomer(data);

      toast.success("Loan Added Successfully ✅");

      resetForm();

      if (navigate) {
        navigate("/customer");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to add loan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <CheckCircle
          className="text-green-600"
          size={34}
        />

        <div>

          <h2 className="text-2xl font-bold">
            Review Loan Details
          </h2>

          <p className="text-gray-500">
            Verify all information before
            submitting.
          </p>

        </div>

      </div>

      {/* Customer */}

      <div className="border rounded-xl p-5 mb-6">

        <h3 className="text-lg font-bold text-yellow-600 mb-4">
          Customer Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Info
            label="Customer Name"
            value={formData.customerName}
          />

          <Info
            label="Father Name"
            value={formData.fatherName}
          />

          <Info
            label="Mother Name"
            value={formData.motherName}
          />

          <Info
            label="Mobile"
            value={formData.mobileNumber}
          />

          <Info
            label="City"
            value={formData.city}
          />

          <Info
            label="District"
            value={formData.district}
          />

          <Info
            label="Street"
            value={formData.street}
          />

          <Info
            label="Proof"
            value={formData.proofType}
          />

          <Info
            label="Card Number"
            value={formData.cardNumber}
          />

        </div>

      </div>

      {/* Jewellery */}

      <div className="border rounded-xl p-5 mb-6">

        <h3 className="text-lg font-bold text-yellow-600 mb-4">
          Jewellery Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Info
            label="Item"
            value={formData.item}
          />

          <Info
            label="Item Type"
            value={formData.itemType}
          />

          <Info
            label="No. of Items"
            value={formData.numberOfItems}
          />

          <Info
            label="Weight"
            value={`${formData.itemWeight} g`}
          />

          <Info
            label="Purity"
            value={formData.purity}
          />

          <Info
            label="Description"
            value={formData.description}
          />

        </div>

      </div>

      {/* Loan */}

      <div className="border rounded-xl p-5">

        <h3 className="text-lg font-bold text-yellow-600 mb-4">
          Loan Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Info
            label="Loan Amount"
            value={`₹ ${Number(
              formData.loanAmount
            ).toLocaleString("en-IN")}`}
          />

          <Info
            label="Principal Amount"
            value={`₹ ${Number(
              formData.principalAmount
            ).toLocaleString("en-IN")}`}
          />

          <Info
            label="Interest Rate"
            value={`${formData.interestRate}%`}
          />

          <Info
            label="Current Value"
            value={`₹ ${Number(
              formData.currentValue || 0
            ).toLocaleString("en-IN")}`}
          />

        </div>

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
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          {loading
            ? "Adding Loan..."
            : "Add Loan"}
        </button>

      </div>

    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">
      {label}
    </p>

    <p className="font-semibold break-words">
      {value || "-"}
    </p>
  </div>
);

export default LoanReview;