import React from "react";
import { User, Gem, Landmark, ClipboardCheck, Check } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Customer",
    icon: User,
  },
  {
    id: 2,
    title: "Items",
    icon: Gem,
  },
  {
    id: 3,
    title: "Loan",
    icon: Landmark,
  },
  {
    id: 4,
    title: "Review",
    icon: ClipboardCheck,
  },
];

const LoanStepper = ({ currentStep }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-5">

      {/* Desktop */}

      <div className="hidden md:flex items-center justify-between">

        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = currentStep > step.id;
          const active = currentStep === step.id;

          return (
            <React.Fragment key={step.id}>

              <div className="flex flex-col items-center flex-1">

                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : active
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {completed ? (
                    <Check size={24} />
                  ) : (
                    <Icon size={24} />
                  )}
                </div>

                <p
                  className={`mt-3 text-sm font-semibold
                  ${
                    active
                      ? "text-yellow-600"
                      : completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>

              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full
                  ${
                    currentStep > step.id
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              )}

            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile */}

      <div className="md:hidden space-y-4">

        {steps.map((step) => {
          const Icon = step.icon;

          const completed = currentStep > step.id;
          const active = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center
                ${
                  completed
                    ? "bg-green-500 text-white"
                    : active
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {completed ? (
                  <Check size={20} />
                ) : (
                  <Icon size={20} />
                )}
              </div>

              <div>

                <h3
                  className={`font-semibold
                  ${
                    active
                      ? "text-yellow-600"
                      : completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  Step {step.id}
                </h3>

                <p className="text-sm text-gray-500">
                  {step.title}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default LoanStepper;