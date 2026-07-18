import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ReportHeader from "./ReportHeader";
import ReportFilter from "./ReportFilter";
import ReportTable from "./ReportTable";
import ExportExcel from "./ExportExcel";

import { getPaymentHistory } from "../../services/reportService";

const ReportArea = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      setLoading(true);

      const res = await getPaymentHistory();

      setPayments(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load payment history"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = useMemo(() => {
    let data = [...payments];

    // Filter
    if (filter !== "All") {
      data = data.filter(
        (payment) => payment.paymentType === filter
      );
    }

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter(
        (payment) =>
          payment.customer.customerId
            .toLowerCase()
            .includes(keyword) ||
          payment.customer.customerName
            .toLowerCase()
            .includes(keyword)
      );
    }

    return data;
  }, [payments, filter, search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-xl font-semibold">
          Loading Reports...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-6">

      {/* Page Title */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Payment Reports
        </h1>

        <p className="text-gray-500 mt-1">
          Interest Payment History & Principal Payment History
        </p>
         <ExportExcel
    payments={filteredPayments}
  />
      </div>

      {/* Summary Cards */}

      <ReportHeader
        payments={filteredPayments}
      />

      {/* Filters */}

      <ReportFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {/* Table */}

      <ReportTable
        payments={filteredPayments}
      />

    </div>
  );
};

export default ReportArea;