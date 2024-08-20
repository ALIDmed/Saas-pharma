import { ChevronLast, ChevronFirst } from "lucide-react";
import logo from "../../assets/logo.png";
import { HomeContext } from "@/pages/Home";
import { useContext } from "react";
import SearchFilter from "./Filters/SearchFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import SubCategoryFilter from "./Filters/SubCategoryFilter";
import DateFilter from "./Filters/DateFilter";
import LaboFilter from "./Filters/LaboFilter";

const Sidebar = () => {
  const { expanded, setExpanded } = useContext(HomeContext);
  return (
    <aside className="h-screen fixed top-0 left-0 z-10">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "hidden"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        {/* FILTER */}
        <ul className={`flex-1 px-3 ${!expanded && "space-y-14"}`}>
          <SearchFilter expanded={expanded} />
          <LaboFilter expanded={expanded} />
          <CategoryFilter expanded={expanded} />
          <SubCategoryFilter expanded={expanded} />
          <DateFilter expanded={expanded} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
