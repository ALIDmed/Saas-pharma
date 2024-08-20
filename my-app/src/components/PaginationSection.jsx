import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationSection = ({ totalPages, setCurrentPage }) => {

    const handleOnChange = (event, value) => {
        setCurrentPage(value);
    }

  return (
    <div className="flex justify-center items-center mb-10">
      <Pagination
        count={totalPages}
        className="mx-auto self-center"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default PaginationSection;
