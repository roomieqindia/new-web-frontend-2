import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function ButtonGroup({
  label,
  options,
  name,
  setValue,
  getValues,
  error,
  labelClass,
  flat = false,
  optionClass,
}) {
  const [selectedValue, setSelectedValue] = useState(getValues(name));

  const handleButtonClick = (value) => {
    setValue(name, value);
    setSelectedValue(value);
  };
  useEffect(() => {
    setSelectedValue(getValues(name));
  }, [getValues, getValues(name), name]);
  return (
    <>
      <p className={`${labelClass}`}>{label}</p>
      <div className={`grid  ${flat ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleButtonClick(option)}
            className={` ${optionClass} ${
              selectedValue === option
                ? "bg-white ring-2 ring-purple-200"
                : "bg-transparent ring-1 ring-gray-500"
            } p-4 rounded-lg   hover:bg-white hover:ring-2 hover:ring-purple-200  transition-colors `}
            // add shadow
            style={{
              boxShadow:
                selectedValue === option
                  ? "4px 4px 10px 0px #e9d5ff"
                  : "4px 4px 10px 0px #4f4f4f",
              borderWidth: selectedValue === option ? "2px" : "1px",
              borderColor: selectedValue === option ? "#e9d5ff" : "#4f4f4f",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </>
  );
}

export default ButtonGroup;
