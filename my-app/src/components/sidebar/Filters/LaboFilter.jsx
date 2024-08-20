import { School } from "lucide-react";
import Select from "react-select";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/pages/Home";
import { customStyles } from "@/constants/index";


const LaboFilter = ({ expanded }) => {
  const { filters, setFilters, token } = useContext(HomeContext);
  const [laboOptions, setLaboOptions] = useState([]);
  const [laboQuery, setLaboQuery] = useState("");

  const handleOnChange = (labos) => {
    const labos_list = labos.map((labo) => labo.value);
    const newFilters = { ...filters, labo_name: labos_list };
    setFilters(newFilters);
  };

  const handleInputChange = (laboQuery) => {
    setLaboQuery(laboQuery);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3001/drugs/labos?laboQuery=${encodeURIComponent(
        laboQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLaboOptions(
          data.labos.map((labo) => ({
            value: labo.labo_name,
            label: labo.labo_name,
          }))
        );
      });
  }, [laboQuery]);

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors group flex-col gap-2">
      <div className="flex flex-row">
        <School size={20} />
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "hidden"
          }`}
        >
          Laboratory Name
        </span>
      </div>
      <Select
        options={laboOptions}
        styles={customStyles}
        isMulti
        onChange={handleOnChange}
        onInputChange={handleInputChange}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: "black",
          },
        })}
        className={`focus:ring-4 ring-inset w-full max-w-[240px] m-0 ${
          expanded ? "w-52" : "hidden"
        }`}
      />
    </li>
  );
};

export default LaboFilter;
