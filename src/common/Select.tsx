import React from "react";
import Select from "@atlaskit/select";

const temp = [
  { label: "Adelaide", value: "adelaide" },
  { label: "Brisbane", value: "brisbane" },
  { label: "Canberra", value: "canberra" },
  { label: "Darwin", value: "darwin" },
  { label: "Hobart", value: "hobart" },
  { label: "Melbourne", value: "melbourne" },
  { label: "Perth", value: "perth" },
  { label: "Sydney", value: "sydney" },
];

const SelectInput = ({ options, onChange, placeholder="Choose" }) => {
  return (
    <>
      <Select
        inputId="single-select-example"
        className="single-select"
        classNamePrefix="react-select"
        options={options}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default SelectInput;
