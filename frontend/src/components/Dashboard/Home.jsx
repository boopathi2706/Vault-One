import { useEffect, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardCards from "./DashboardCards";
import ProfitChart from "./ProfitChart";

import { getDashboardData } from "../../services/dashboardService";

const Home = () => {
  const [selectedType, setSelectedType] = useState("overall");

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardData();

      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">

    <DashboardHeader
        selectedType={selectedType}
        setSelectedType={setSelectedType}
    />

    <DashboardCards
        dashboardData={dashboardData}
        selectedType={selectedType}
    />

    <ProfitChart
        selectedType={selectedType}
    />

</div>
  );
};

export default Home;