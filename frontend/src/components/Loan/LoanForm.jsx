import React, { useEffect } from "react";

const LoanForm = ({
  formData,
  handleChange,
  nextStep,
  prevStep,
}) => {
  // Auto Calculate Principal Amount
  useEffect(() => {
    if (formData.loanAmount) {
      handleChange({
        target: {
          name: "principalAmount",
          value: formData.loanAmount,
        },
      });
    }
  }, [formData.loanAmount]);

  const validate = () => {
    if (
      !formData.loanAmount ||
      !formData.interestRate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    nextStep();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Loan Details
        </h2>

        <p className="text-gray-500 mt-1">
          Enter loan information.
        </p>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Loan Amount */}

        <div>

          <label className="font-medium">
            Loan Amount (₹) *
          </label>

          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            placeholder="Enter Loan Amount"
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

        </div>

        {/* Principal */}

        <div>

          <label className="font-medium">
            Principal Amount (₹)
          </label>

          <input
            type="number"
            name="principalAmount"
            value={formData.principalAmount}
            readOnly
            className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
          />

        </div>

        {/* Interest */}

        <div>

          <label className="font-medium">
            Interest Rate (%) *
          </label>

          <input
            type="number"
            step="0.01"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            placeholder="2"
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

        </div>

        {/* Current Value */}

        <div>

          <label className="font-medium">
            Current Gold/Silver Value
          </label>

          <input
            type="text"
            value={
              formData.currentValue
                ? `₹ ${Number(
                    formData.currentValue
                  ).toLocaleString("en-IN")}`
                : "Auto Calculated"
            }
            readOnly
            className="w-full mt-2 border rounded-xl p-3 bg-yellow-50"
          />

        </div>

      </div>

      {/* Info Card */}

      <div className="mt-8 rounded-xl bg-yellow-50 border border-yellow-300 p-5">

        <h3 className="font-bold text-yellow-700 mb-3">
          Loan Summary
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <p className="text-gray-500 text-sm">
              Loan Amount
            </p>

            <h4 className="font-semibold text-lg">
              ₹ {formData.loanAmount || 0}
            </h4>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Interest
            </p>

            <h4 className="font-semibold text-lg">
              {formData.interestRate || 0} %
            </h4>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Principal
            </p>

            <h4 className="font-semibold text-lg">
              ₹ {formData.principalAmount || 0}
            </h4>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Item Value
            </p>

            <h4 className="font-semibold text-lg">
              ₹{" "}
              {formData.currentValue
                ? Number(
                    formData.currentValue
                  ).toLocaleString("en-IN")
                : "-"}
            </h4>

          </div>

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
          onClick={validate}
          className="px-8 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
        >
          Next →
        </button>

      </div>

    </div>
  );
};

export default LoanForm;