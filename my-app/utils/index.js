export function formatNumber(num) {
  if (num < 1000) {
    return num.toString();
  } else if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
}

export const calcualteSearchSum = (monthly_search_volume) => {};

export const calculateGrowth = (monthyl_search_volume) => {
  if (monthyl_search_volume.length < 2) {
    console.log("less than 2");
    return 0;
  }
  let growth;
  const lastMonth = monthyl_search_volume[monthyl_search_volume.length - 1];
  let firstMonth;

  for (let i = 0; i < monthyl_search_volume.length; i++) {
    if (monthyl_search_volume[i].search_volume != 0) {
      firstMonth = monthyl_search_volume[i];
      break;
    }
  }

  if (firstMonth.search_volume > lastMonth.search_volume) {
    growth = (firstMonth.search_volume / lastMonth.search_volume) * -1;
  } else {
    growth = lastMonth.search_volume / firstMonth.search_volume;
  }
  return (growth * 100).toFixed(1);
};

export const month_to_num = (month) => {
  const month_to_num = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  return month_to_num[month];
};

export const filterData = (initialData, newFilters, setData) => {
  let filteredData = initialData.filter((item) => {
    let matchesDrugName = true;

    if (typeof newFilters.drug_name === "string") {
      matchesDrugName =
        !newFilters.drug_name ||
        item.drug_name
          .toLowerCase()
          .includes(newFilters.drug_name.toLowerCase());
    } else {
      matchesDrugName =
        !newFilters.drug_name.length ||
        newFilters.drug_name.some(
          (drug) => item.drug_name?.toLowerCase() === drug.toLowerCase()
        );
    }

    const matchesLaboName =
      !newFilters.labo_name.length ||
      newFilters.labo_name.some(
        (labo) => item.labo_name?.toLowerCase() === labo.toLowerCase()
      );
    const matchesCategory =
      !newFilters.category.length ||
      newFilters.category.some(
        (category) => item.category?.toLowerCase() === category.toLowerCase()
      );
    const matchesSubCategory =
      !newFilters.subcategory.length ||
      newFilters.subcategory.some(
        (sub_category) =>
          item.subcategory?.toLowerCase() === sub_category.toLowerCase()
      );

    return (
      matchesDrugName &&
      matchesLaboName &&
      matchesCategory &&
      matchesSubCategory
    );
  });

  if (newFilters.max_year && newFilters.max_month) {
    filteredData = filteredData.map((item) => {
      const filteredByMaxDate = item.monthly_search_volume.filter(
        (volumeData) => {
          return (
            volumeData.year < newFilters.max_year ||
            (volumeData.year === newFilters.max_year &&
              volumeData.month_num <= newFilters.max_month)
          );
        }
      );
      return {
        ...item,
        monthly_search_volume: filteredByMaxDate,
      };
    });
  }

  if (newFilters.min_year && newFilters.min_month) {
    filteredData = filteredData.map((item) => {
      const filteredByMinDate = item.monthly_search_volume.filter(
        (volumeData) => {
          return (
            volumeData.year > newFilters.min_year ||
            (volumeData.year === newFilters.min_year &&
              volumeData.month_num >= newFilters.min_month)
          );
        }
      );
      return {
        ...item,
        monthly_search_volume: filteredByMinDate,
      };
    });
  }

  setData(filteredData);
};
