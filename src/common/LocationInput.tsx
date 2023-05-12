import React from "react";
import useApi from "../hooks/useApi";
import SelectInput from "./Select";

const LocationInput = ({ onChange }) => {
  const { response: locations = [] } = useApi(
    `/assets/json/location.json`,
    "get"
  );
  return (
    <div style={{ width: "220px" }}>
      <SelectInput options={locations} onChange={onChange} />
    </div>
  );
};

export default LocationInput;
