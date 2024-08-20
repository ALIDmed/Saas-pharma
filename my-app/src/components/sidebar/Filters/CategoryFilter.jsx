import { Shapes } from "lucide-react";
import Select from "react-select";
import { HomeContext } from "@/pages/Home";
import { useContext, useEffect, useState } from "react";
import { customStyles } from "@/constants/index";

const CategoryFilter = ({ expanded }) => {
  const { filters, setFilters, token } = useContext(HomeContext);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryQuery, setCategoryQuery] = useState("");

  const handleOnChange = (categories) => {
    const categories_list = categories.map((category) => category.value);
    const newFilters = { ...filters, category: categories_list };
    setFilters(newFilters);
  };

  const handleInputChange = (categoryQuery) => {
    setCategoryQuery(categoryQuery);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3001/drugs/categories?categoryQuery=${encodeURIComponent(
        categoryQuery
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
        setCategoryOptions(
          data.categories.map((category) => ({
            value: category.category,
            label: category.category,
          }))
        );
      });
  }, [categoryQuery]);

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors group flex-col gap-2">
      <div className="flex flex-row">
        <Shapes size={20} />
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "hidden"
          }`}
        >
          Category
        </span>
      </div>
      <Select
        options={categoryOptions}
        onChange={handleOnChange}
        onInputChange={handleInputChange}
        styles={customStyles}
        isMulti
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: "black",
          },
        })}
        className={`focus:ring-4 ring-pink-500 ring-inset w-full max-w-[240px] m-0 ${
          expanded ? "w-52" : "hidden"
        }`}
      />
    </li>
  );
};

export default CategoryFilter;
