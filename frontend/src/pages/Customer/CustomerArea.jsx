import React, { useEffect, useState } from "react";
import CustomerFilter from "./CustomerFilter";
import CustomerTable from "./CustomerTable";
import Pagination from "./Pagination";

import {
  getAllCustomers,
  getActiveCustomers,
  getOverdueCustomers,
  getClosedCustomers,
} from "../../services/customerService";

const CustomerArea = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // -----------------------------
  // Load Customers
  // -----------------------------

  useEffect(() => {
    loadCustomers();
  }, [status]);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      let response;

      switch (status) {
        case "active":
          response = await getActiveCustomers();
          break;

        case "overdue":
          response = await getOverdueCustomers();
          break;

        case "closed":
          response = await getClosedCustomers();
          break;

        default:
          response = await getAllCustomers();
      }

      setCustomers(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Search Filter
  // -----------------------------

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.customerId.toLowerCase().includes(keyword) ||
      customer.customerName.toLowerCase().includes(keyword) ||
      customer.mobileNumber.includes(keyword)
    );
  });

  // -----------------------------
  // Pagination
  // -----------------------------

  const indexOfLastCustomer =
    currentPage * customersPerPage;

  const indexOfFirstCustomer =
    indexOfLastCustomer - customersPerPage;

  const currentCustomers =
    filteredCustomers.slice(
      indexOfFirstCustomer,
      indexOfLastCustomer
    );

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

    return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">

      {/* Page Header */}

      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Customer Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage Gold & Silver Pawn Customers
            </p>

          </div>

          <div className="bg-yellow-500 text-white rounded-xl px-6 py-3">

            <p className="text-sm">
              Total Customers
            </p>

            <h2 className="text-2xl font-bold">
              {filteredCustomers.length}
            </h2>

          </div>

        </div>

      </div>

      {/* Filter */}

      <CustomerFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* Loading */}

      {loading ? (

        <div className="bg-white rounded-2xl shadow-md h-80 flex justify-center items-center">

          <div className="text-xl font-semibold text-gray-600">
            Loading Customers...
          </div>

        </div>

      ) : (

        <>
          {/* Customer Table */}

          <CustomerTable
            customers={currentCustomers}
          />

          {/* Pagination */}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </>

      )}

    </div>
  );
};

export default CustomerArea;