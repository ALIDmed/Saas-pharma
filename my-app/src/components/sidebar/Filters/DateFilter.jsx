import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { HomeContext } from "@/pages/Home";
import { useContext, useState } from "react";
import { month_to_num } from "../../../../utils/index";

const DateFilter = ({ expanded }) => {
  const { filters, setFilters, setData } = useContext(HomeContext);
  const [dateError, setDateError] = useState(false);

  const handleOnChange = (e) => {
    const newFilters = { ...filters };
    if (!e.value) {
      // if cleared
      console.log("cleared");
      if (e.target.id === "maxDate") {
        newFilters.max_month = null;
        newFilters.max_year = null;
      } else {
        newFilters.min_month = null;
        newFilters.min_year = null;
      }
    } else {
      console.log(e.value);
      const parts = e.value.toString().split(" ");
      if (e.target.id === "maxDate") {
        newFilters.max_month = month_to_num(parts[1]);
        newFilters.max_year = parseInt(parts[3]);
      } else {
        newFilters.min_month = month_to_num(parts[1]);
        newFilters.min_year = parseInt(parts[3]);
      }
    }
    if (
      newFilters.min_year &&
      newFilters.max_year &&
      newFilters.min_month &&
      newFilters.max_month &&
      new Date(newFilters.max_year, newFilters.max_month) <
        new Date(newFilters.min_year, newFilters.min_month)
    ) {
      setDateError(true);
      return;
    }
    setDateError(false);
    setFilters(newFilters);
    console.log(newFilters);
    // filterData(data, newFilters, setData);
  };

  const maxDate = new Date(2024, 5);
  const minDate = new Date(2020, 8);

  return (
    <>
      <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors group flex-col gap-2">
        <div className="flex flex-row">
          <CalendarArrowUp size={20} />
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "hidden"
            }`}
          >
            Minimum Date
          </span>
        </div>
        <div
          className={`flex flex-row gap-1 max-w-[240px] w-full ${
            expanded ? "w-52" : "hidden"
          }`}
        >
          <Calendar
            id="minDate"
            view="month"
            dateFormat="mm/yy"
            inputStyle={{
              backgroundColor: "white",
              width: "100%",
              border: "1px solid #e5e7eb",
              height: "40px",
              padding: "0.375rem 0.75rem",
              fontWeight: 400,
            }}
            minDate={minDate}
            maxDate={maxDate}
            showButtonBar
            onChange={handleOnChange}
          />
        </div>
      </li>
      <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors group flex-col gap-2">
        <div className="flex flex-row">
          <CalendarArrowDown size={20} />
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "hidden"
            }`}
          >
            Maximum Date
          </span>
        </div>
        <div
          className={`flex flex-row gap-1 max-w-[240px] w-full ${
            expanded ? "w-52" : "hidden"
          }`}
        >
          <Calendar
            id="maxDate"
            view="month"
            dateFormat="mm/yy"
            inputStyle={{
              backgroundColor: "white",
              width: "100%",
              border: "1px solid #e5e7eb",
              height: "40px",
              padding: "0.375rem 0.75rem",
              fontWeight: 400,
            }}
            minDate={minDate}
            maxDate={maxDate}
            showButtonBar
            onChange={handleOnChange}
          />
        </div>
      </li>
      {dateError && expanded && (
        <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors group flex-col gap-2 italic text-red-700">
          Date Error
        </li>
      )}
    </>
  );
};

export default DateFilter;
