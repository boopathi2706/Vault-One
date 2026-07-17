import React from "react";

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-100 text-green-700 border border-green-300",
    Overdue: "bg-red-100 text-red-700 border border-red-300",
    Closed: "bg-gray-200 text-gray-700 border border-gray-300",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        md:text-sm
        font-semibold
        whitespace-nowrap
        ${styles[status] || "bg-gray-100 text-gray-700 border"}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;