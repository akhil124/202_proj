import React from "react";
import Button from "@atlaskit/button/standard-button";
import ModalContainer from "../../common/Modal";
import Register from "../Register/Register";
import { useAuth } from "../../hooks/useAuth";
import AlertDismiss from "../../common/Alert";
import { deleteUser, updateUser } from "../../services/userService";
import { initialUser } from "../../constants/userConstants";

const DeleteUser = ({ user }) => {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const handleDelete = async (user) => {
    try {
      const res = await deleteUser(user?.email);
      setSuccess("User Deleted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data);
    }
  };
  return (
    <>
      <Button onClick={() => handleDelete(user)} appearance="danger">Delete</Button>
      {error && (
        <AlertDismiss message={error} setError={setError} variant="danger" />
      )}
      {success && <AlertDismiss message={success} setError={setSuccess} />}
    </>
  );
};

export default DeleteUser;
