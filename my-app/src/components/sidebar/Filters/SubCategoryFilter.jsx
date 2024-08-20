import { Layers2 } from "lucide-react";
import Select from "react-select";
import { subCategories } from "../../../../data/subcategories";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/pages/Home";
import { customStyles } from "@/constants/index";


const SubCategoryFilter = ({ expanded }) => {
  const { filters, setFilters, token } = useContext(HomeContext);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [subCategoryQuery, setSubCategoryQuery] = useState("");

  const handleOnChange = (sub_categories) => {
    const sub_categories_list = sub_categories.map(
      (sub_category) => sub_category.value
    );
    const newFilters = { ...filters, subcategory: sub_categories_list };
    setFilters(newFilters);
  };

  const handleInputChange = (subCategoryQuery) => {
    setSubCategoryQuery(subCategoryQuery);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3001/drugs/subcategories?subCategoryQuery=${encodeURIComponent(
        subCategoryQuery
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
        setSubCategoryOptions(
          data.subCategories.map((subCategory) => ({
            value: subCategory.subCategory,
            label: subCategory.subCategory,
          }))
        );
      });
  }, [subCategoryQuery]);

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors group flex-col gap-2">
      <div className="flex flex-row">
        <Layers2 size={20} />
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "hidden"
          }`}
        >
          Sub-Category
        </span>
      </div>
      <Select
        styles={customStyles}
        options={subCategoryOptions}
        isMulti
        onInputChange={handleInputChange}
        onChange={handleOnChange}
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

export default SubCategoryFilter;
