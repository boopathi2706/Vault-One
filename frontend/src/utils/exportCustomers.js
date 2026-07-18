import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportCustomersToExcel = (customers) => {
  const data = customers.map((customer) => ({
    "Customer ID": customer.customerId,
    "Customer Name": customer.customerName,
    "Father Name": customer.fatherName,
    "Mother Name": customer.motherName || "-",

    "Mobile Number": customer.mobileNumber,

    City: customer.address?.city,
    Street: customer.address?.street,
    District: customer.address?.district,

    "Proof Type": customer.proof?.proofType,
    "Card Number": customer.proof?.cardNumber,

    Item: customer.item,
    "Item Type": customer.itemType,
    Purity: customer.purity,
    Weight: customer.itemWeight,
    "No of Items": customer.numberOfItems,

    "Loan Amount": customer.loanAmount,
    "Principal Amount": customer.principalAmount,
    "Interest Amount": customer.interestAmount,
    "Interest Rate": customer.interestRate,

    "Current Value": customer.currentValue,

    Status: customer.loanStatus,

    "Loan Date": customer.loanDate
      ? new Date(customer.loanDate).toLocaleDateString("en-IN")
      : "",

    "Principal Paid Date": customer.principalPaidDate
      ? new Date(customer.principalPaidDate).toLocaleDateString("en-IN")
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 25 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 25 },
    { wch: 18 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 18 },
    { wch: 12 },
    { wch: 15 },
    { wch: 18 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Customers"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(
    file,
    `Customers_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};