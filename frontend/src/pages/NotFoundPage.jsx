import React from "react";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-6">

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="w-28 h-28 rounded-full bg-yellow-100 flex items-center justify-center">

            <SearchX
              size={60}
              className="text-yellow-600"
            />

          </div>

        </div>

        {/* Error Code */}

        <h1 className="text-7xl md:text-8xl font-extrabold text-yellow-500 mt-8">
          404
        </h1>

        {/* Title */}

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>

        {/* Description */}

        <p className="text-gray-500 mt-4 leading-7">
          Sorry, the page you're looking for doesn't exist
          or has been moved.
          <br />
          Please check the URL or return to the dashboard.
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition"
          >
            <Home size={20} />
            Dashboard
          </button>

        </div>

        {/* Footer */}

        <p className="mt-8 text-sm text-gray-400">
          Gold Pawn Shop Management System
        </p>

      </div>

    </div>
  );
};

export default NotFoundPage;