import React from "react";
import Button from "@atlaskit/button/standard-button";
import ModalContainer from "../../common/Modal";
import Register from "../../components/Register/Register";
import { useAuth } from "../../hooks/useAuth";
import AlertDismiss from "../../common/Alert";
import { updateUser } from "../../services/userService";
import { initialUser } from "../../constants/userConstants";

const NewUser = ({ update = false, preUser=initialUser}) => {
  const { signup } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const handleSignUp = async (user) => {
    try {
      if (update) {
        const res = await updateUser(user);
        setSuccess("User Updated");
      } else {
        const res = await signup(user);
        setSuccess("User Created");
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error?.response?.data);
    }
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {update ? "Update" : "Create User"}
      </Button>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title={`${update ? "Update User" : "Create User"}`}
      >
        <Register onSubmit={handleSignUp} preUser={preUser} update={update}/>
      </ModalContainer>
      {error && (
        <AlertDismiss message={error} setError={setError} variant="danger" />
      )}
      {success && <AlertDismiss message={success} setError={setSuccess} />}
    </>
  );
};

export default NewUser;
