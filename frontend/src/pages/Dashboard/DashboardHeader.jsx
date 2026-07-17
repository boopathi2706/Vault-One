import React from "react";
import { Coins, Gem, BarChart3 } from "lucide-react";

const DashboardHeader = ({ selectedType, setSelectedType }) => {
  const buttons = [
    {
      name: "Gold",
      value: "gold",
      icon: <Coins size={20} />,
      color: "bg-yellow-500",
    },
    {
      name: "Silver",
      value: "silver",
      icon: <Gem size={20} />,
      color: "bg-gray-500",
    },
    {
      name: "Overall",
      value: "overall",
      icon: <BarChart3 size={20} />,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 shadow-lg p-4 md:p-6">

      {/* Top */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        {/* Left */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-sm md:text-base text-yellow-100 mt-1">
            Gold Pawn Shop Management System
          </p>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-wrap gap-3">

          {buttons.map((button) => (
            <button
              key={button.value}
              onClick={() => setSelectedType(button.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300

                ${
                  selectedType === button.value
                    ? `${button.color} text-white shadow-lg scale-105`
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {button.icon}
              {button.name}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;