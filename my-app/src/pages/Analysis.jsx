import Navbar from "@/components/Navbar";
import { createContext, useState, useEffect } from "react";
import DrugsComparaison from "@/components/analysis/DrugsComparaison";
import { calculateGrowth } from "../../utils/index";
import ChatBotWidget from "@/components/analysis/ChatBotWidget";

export const AnalysisContext = createContext();

const Analysis = () => {
  const [drugsOptions, setDrugsOptions] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/drugs/analysisdrugs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedDrugs: selectedDrugs }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChartData(
          data.drugs.map((drug) => ({
            drug_name: drug.drug_name,
            search_volume:
              drug.monthly_search_volume[drug.monthly_search_volume.length - 1]
                .search_volume,
            growth: calculateGrowth(drug.monthly_search_volume),
          }))
        );
        console.log("chartData", chartData);
      });
  }, [selectedDrugs]);

  return (
    <div>
      <AnalysisContext.Provider
        value={{
          drugsOptions,
          setDrugsOptions,
          selectedDrugs,
          setSelectedDrugs,
          chartData,
          setChartData,
        }}
      >
        <ChatBotWidget />
        <Navbar />
        <div className="w-screen flex justify-center px-4 lg:px-0 mt-28">
          <div className="w-full flex flex-col space-y-12 mx-12">
            <DrugsComparaison />
          </div>
        </div>
      </AnalysisContext.Provider>
    </div>
  );
};

export default Analysis;
