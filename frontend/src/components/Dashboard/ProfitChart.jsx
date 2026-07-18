import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  getMonthWiseProfit,
  getDayWiseProfit,
} from "../../services/dashboardService";

const ProfitChart = () => {
  const [filter, setFilter] = useState("month");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, [filter]);

  const loadChart = async () => {
    try {
      setLoading(true);

      const res =
        filter === "month"
          ? await getMonthWiseProfit()
          : await getDayWiseProfit();

      setChartData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-gray-700">
          Profit Analytics
        </h2>

        <div className="flex gap-3 mt-3 md:mt-0">

          <button
            onClick={() => setFilter("month")}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              filter === "month"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Month
          </button>

          <button
            onClick={() => setFilter("day")}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              filter === "day"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Day
          </button>

        </div>

      </div>

      {/* Chart */}

      {loading ? (
        <div className="h-[450px] flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto">

          <div
            style={{
              width:
                filter === "day"
                  ? `${chartData.length * 70}px`
                  : "100%",
              minWidth: "100%",
              height: "450px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={chartData}
                barGap={5}
                barCategoryGap="20%"
                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 70,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey={filter === "month" ? "month" : "date"}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tickFormatter={(value) => {
                    if (filter === "day") {
                      return new Date(value).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      );
                    }

                    const [year, month] = value.split("-");

                    return new Date(
                      year,
                      month - 1
                    ).toLocaleString("en", {
                      month: "short",
                    });
                  }}
                />

                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    `₹ ${Number(value).toLocaleString("en-IN")}`
                  }
                />

                <Legend />

                <Bar
                  dataKey="gold"
                  fill="#EAB308"
                  name="Gold"
                  radius={[6, 6, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="silver"
                  fill="#94A3B8"
                  name="Silver"
                  radius={[6, 6, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="total"
                  fill="#2563EB"
                  name="Total"
                  radius={[6, 6, 0, 0]}
                  barSize={18}
                />

              </BarChart>

            </ResponsiveContainer>
          </div>

        </div>
      )}

    </div>
  );
};

export default ProfitChart;