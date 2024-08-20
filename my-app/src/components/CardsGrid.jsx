import CardComponent from "./CardComponent";
import { HomeContext } from "@/pages/Home";
import { calculateGrowth } from "../../utils/index";
import PaginationSection from "./PaginationSection";
import { useContext, useEffect, useState } from "react";

const CardsGrid = () => {
  const { expanded, token, filters } = useContext(HomeContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    fetch(
      `http://localhost:3001/drugs?currentPage=${currentPage}&limit=${limit}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters)
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.drugs);
        setTotalPages(data.totalPages);
      });
  }, [currentPage, filters]);

  return (
    <div
      className={`w-full flex flex-col space-y-5 justify-center ${
        expanded ? "ml-[280px]" : "ml-16"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-20">
        {data.map((item) => (
          <CardComponent
            drug_name={item.drug_name}
            search_volume={
              item.monthly_search_volume[item.monthly_search_volume.length - 1]
                ?.search_volume
            }
            growth={calculateGrowth(item.monthly_search_volume)}
            monthly_search_volume={item.monthly_search_volume}
            trend={item.trend}
          />
        ))}
      </div>
      <div>
        <PaginationSection
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CardsGrid;
