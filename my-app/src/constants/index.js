export const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    ringOffsetColor: "var(--background)",
    padding: "0.09rem 0.75rem",
    transition: "all 0.2s",
  }),
  input: (provided) => ({
    ...provided,
    "::file-selector-button": {
      border: 0,
      backgroundColor: "transparent",
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  }),
  "&:focus-visible": {
    outline: "none",
    ring: "2px solid var(--ring)",
    ringOffset: "2px",
  },
  option: (provided) => ({
    ...provided,
    fontSize: "12px", // Adjust this value as needed
  }),
  multiValue: (provided) => ({
    ...provided,
    fontSize: "14px", // Adjust this value as needed
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6d7c92",
  }),
};
