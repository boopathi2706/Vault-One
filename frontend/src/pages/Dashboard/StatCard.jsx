import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  bgColor = "bg-yellow-500",
  textColor = "text-white",
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-5
        flex
        items-center
        justify-between
        w-full
      "
    >
      {/* Left */}
      <div>
        <h3 className="text-gray-500 text-sm md:text-base font-medium">
          {title}
        </h3>

        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-800 break-words">
          {value}
        </h2>
      </div>

      {/* Right Icon */}
      <div
        className={`
          ${bgColor}
          ${textColor}
          w-14
          h-14
          md:w-16
          md:h-16
          rounded-full
          flex
          items-center
          justify-center
          shadow-lg
        `}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;