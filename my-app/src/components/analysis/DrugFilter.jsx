import Select from "react-select";
import { AnalysisContext } from "@/pages/Analysis";
import { useContext, useState, useEffect } from "react";
import { customStyles } from "@/constants/index";

const DrugFilter = () => {
  const { drugsOptions, setDrugsOptions, selectedDrugs, setSelectedDrugs } =
    useContext(AnalysisContext);
  const [drugQuery, setDrugQuery] = useState("");

  const handleOnChange = (drugs) => {
    const newSelectedDrugs = drugs.map((drug) => drug.value);
    setSelectedDrugs(newSelectedDrugs);
  };

  const handleInputChange = (drugQuery) => {
    setDrugQuery(drugQuery);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3001/drugs/drugsvolume?drugQuery=${encodeURIComponent(
        drugQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDrugsOptions(
          data.drugs.map((drug) => ({
            value: drug.drug_name,
            label: drug.drug_name,
          }))
        );
      });
  }, [drugQuery]);

  return (
    <Select
      options={drugsOptions}
      onChange={handleOnChange}
      onInputChange={handleInputChange}
      styles={customStyles}
      isMulti
      theme={(theme) => ({
        ...theme,
        borderRadius: 3,
        colors: {
          ...theme.colors,
          primary: "black",
        },
      })}
      className="w-full focus:ring-4 ring-inset m-0"
    />
  );
};

export default DrugFilter;
