import CardsGrid from "@/components/CardsGrid";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/Navbar";

import { createContext, useContext, useEffect, useState } from "react";
import { data as demoData } from "../../data/demo_data";
import { AppContext } from "@/App";

export const HomeContext = createContext();

const Home = () => {
  const [expanded, setExpanded] = useState(true);
  const [filters, setFilters] = useState({
    drug_name: null,
    labo_name: null,
    category: null,
    subcategory: null,
    min_month: null,
    max_month: null,
    min_year: null,
    max_year: null,
  });
  const { user, token } = useContext(AppContext);

  return (
    <>
      <HomeContext.Provider
        value={{ expanded, setExpanded, filters, setFilters }}
      >
        <Navbar />
        <div className="p-0 font-inter px-[20px] flex flex-row ">
          <Sidebar />
          <CardsGrid />
        </div>
      </HomeContext.Provider>
    </>
  );
};

export default Home;
