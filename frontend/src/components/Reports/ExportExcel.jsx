import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

const ExportExcel = ({ payments }) => {
  const downloadExcel = () => {
    if (!payments.length) return;

    const data = payments.map((payment) => ({
      "Customer ID": payment.customer.customerId,
      "Customer Name": payment.customer.customerName,
      Mobile: payment.customer.mobileNumber,
      Item: payment.customer.item,
      "Item Type": payment.customer.itemType,
      Purity: payment.customer.purity,
      "Weight (g)": payment.customer.itemWeight,
      "Payment Type": payment.paymentType,
      "Interest Amount":
        payment.paymentType === "Interest"
          ? payment.amountPaid
          : "",

      "Principal Amount":
        payment.paymentType === "Principal"
          ? payment.principalAmount
          : "",

      "Paid Date": new Date(
        payment.paidDate
      ).toLocaleDateString("en-IN"),
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Payment History"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(
      file,
      `Payment_History_${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );
  };

  return (
    <button
      onClick={downloadExcel}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
    >
      <Download size={20} />
      Download Excel
    </button>
  );
};

export default ExportExcel;