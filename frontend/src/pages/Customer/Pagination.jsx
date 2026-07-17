import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">

      {/* Page Info */}

      <p className="text-gray-600 text-sm">
        Page{" "}
        <span className="font-semibold">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold">
          {totalPages}
        </span>
      </p>

      {/* Buttons */}

      <div className="flex items-center gap-2 flex-wrap justify-center">

        {/* Previous */}

        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className={`
            flex items-center gap-1
            px-4 py-2 rounded-lg
            transition

            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }
          `}
        >
          <ChevronLeft size={18} />
          Prev
        </button>

        {/* Page Numbers */}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() =>
              onPageChange(page)
            }
            className={`
              w-10 h-10 rounded-lg font-semibold transition

              ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Next */}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className={`
            flex items-center gap-1
            px-4 py-2 rounded-lg
            transition

            ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }
          `}
        >
          Next
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default Pagination;