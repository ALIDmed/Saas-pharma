import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useContext } from "react";
import { HomeContext } from "@/pages/Home";


const SearchFilter = ({ expanded }) => {
  const handleOnChange = (e) => {
    let search = e.target.value;
    const newFilters = { ...filters, drug_name: search };
    setFilters(newFilters);
    // filterData(data, newFilters, setData);
  };
  const { filters, setFilters, setData } = useContext(HomeContext);

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors group flex-col gap-2">
      <div className="flex flex-row">
        <Search size={20} />
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "hidden"
          }`}
        >
          Search
        </span>
      </div>
      <Input
        onChange={handleOnChange}
        placeholder="Enter the drug name"
        className={`transition-all ${expanded ? "w-full" : "hidden"}`}
      />
    </li>
  );
};

export default SearchFilter;
