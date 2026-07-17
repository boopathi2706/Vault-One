import React from "react";
import StatCard from "./StatCard";

import {
  Users,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Wallet,
  IndianRupee,
  Coins,
  TrendingUp,
} from "lucide-react";

const DashboardCards = ({ dashboardData, selectedType }) => {
  if (!dashboardData) {
    return (
      <div className="mt-8 text-center text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  const data = dashboardData[selectedType];

  if (!data) {
    return (
      <div className="mt-8 text-center text-red-500">
        No Dashboard Data Found
      </div>
    );
  }

  const cards = [
    {
      title: "Total Customers",
      value: data.totalCustomers,
      icon: <Users size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Active Customers",
      value: data.activeCustomers,
      icon: <UserCheck size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Overdue Customers",
      value: data.overdueCustomers,
      icon: <AlertTriangle size={28} />,
      color: "bg-red-500",
    },
    {
      title: "Closed Customers",
      value: data.closedCustomers,
      icon: <CheckCircle size={28} />,
      color: "bg-purple-500",
    },

    {
      title:
        selectedType === "overall"
          ? "Total Loan Amount"
          : "Active Loan Amount",

      value: `₹ ${Number(
        data.totalLoanAmount ?? data.activeLoanAmount ?? 0
      ).toLocaleString("en-IN")}`,

      icon: <Wallet size={28} />,
      color: "bg-orange-500",
    },

    {
      title:
        selectedType === "overall"
          ? "Outstanding Amount"
          : "Outstanding Amount",

      value: `₹ ${Number(
        data.totalOutstandingAmount ??
          data.activeOutstandingAmount ??
          0
      ).toLocaleString("en-IN")}`,

      icon: <IndianRupee size={28} />,
      color: "bg-pink-500",
    },

    {
      title:
        selectedType === "overall"
          ? "Interest Received"
          : "Interest Received",

      value: `₹ ${Number(
        data.totalInterestReceived ?? 0
      ).toLocaleString("en-IN")}`,

      icon: <Coins size={28} />,
      color: "bg-cyan-500",
    },

    {
      title: "Total Profit",

      value: `₹ ${Number(
        data.totalProfit ?? 0
      ).toLocaleString("en-IN")}`,

      icon: <TrendingUp size={28} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div
      className="
        mt-8
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >
      {cards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          bgColor={card.color}
        />
      ))}
    </div>
  );
};

export default DashboardCards;