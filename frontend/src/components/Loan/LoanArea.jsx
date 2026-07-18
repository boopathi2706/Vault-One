import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoanStepper from "./LoanStepper";
import CustomerForm from "./CustomerForm";
import ItemForm from "./ItemForm";
import LoanForm from "./LoanForm";
import LoanReview from "./LoanReview";

const LoanArea = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const initialForm = {
    // Customer
    customerName: "",
    fatherName: "",
    motherName: "",
    mobileNumber: "",

    city: "",
    street: "",
    district: "",

    proofType: "",
    cardNumber: "",

    // Item
    item: "",
    itemType: "",
    numberOfItems: "",
    itemWeight: "",
    purity: "",
    description: "",

    // Loan
    loanAmount: "",
    principalAmount: "",
    interestRate: "",
    currentValue: "",

    // Images
    proofPhoto: null,
    customerPhoto: null,
    customerSignature: null,
    jewelleryPhoto: null,
  };

  const [formData, setFormData] =
    useState(initialForm);

  // -----------------------------
  // Input Change
  // -----------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // File Change
  // -----------------------------

  const handleFileChange = (
    e,
    fieldName
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.files[0],
    }));
  };

  // -----------------------------
  // Next
  // -----------------------------

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  // -----------------------------
  // Previous
  // -----------------------------

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // -----------------------------
  // Reset
  // -----------------------------

  const resetForm = () => {
    setFormData(initialForm);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-4 md:p-6">

        {/* Header */}

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg mb-8">

          <h1 className="text-3xl font-bold">
            Add New Loan
          </h1>

          <p className="mt-2 text-yellow-100">
            Create a new customer loan in
            four easy steps.
          </p>

        </div>

        {/* Stepper */}

        <LoanStepper
          currentStep={step}
        />

        <div className="mt-8">

          {step === 1 && (
            <CustomerForm
              formData={formData}
              handleChange={
                handleChange
              }
              handleFileChange={
                handleFileChange
              }
              nextStep={nextStep}
            />
          )}

          {step === 2 && (
            <ItemForm
              formData={formData}
              handleChange={
                handleChange
              }
              handleFileChange={
                handleFileChange
              }
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 3 && (
            <LoanForm
              formData={formData}
              handleChange={
                handleChange
              }
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 4 && (
            <LoanReview
              formData={formData}
              prevStep={prevStep}
              resetForm={resetForm}
              navigate={navigate}
            />
          )}

        </div>

      </div>

    </div>
  );
};

export default LoanArea;