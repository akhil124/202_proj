import React from "react";
import SelectInput from "../../common/Select";
import useApi from "../../hooks/useApi";

const Userlist = ({ setSelectedUser }) => {
  const { response: users = [] } = useApi(`/user/all`, "get");

  const convertToOptions = (users) =>
    users?.data.map((user) => ({
      value: user,
      label: user.firstName + " " + user.lastName,
    }));

  const onChange = (user) => {
    setSelectedUser(user?.value);
  };

  return (
    <div style={{ width: "220px" }}>
      <SelectInput
        options={convertToOptions(users)}
        onChange={onChange}
        placeholder="Select User"
      />
    </div>
  );
};

export default Userlist;
