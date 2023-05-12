import React from "react";
import { userCheckin, userCheckout } from "../../services/userService";
import TZ_OFFSET from "../../constants/time";
import Button from "@atlaskit/button/standard-button";
import AlertDismiss from "../../common/Alert";

const CheckIn = ({ user, check = "in" }) => {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const handleCheck = async (val) => {
    try {
      if (user) {
        console.log(user);
        const date = new Date(new Date().getTime() + TZ_OFFSET);
        const time = date.toISOString().split("T")[1].split(".")[0];
        const today = new Date(
          new Date(date.toDateString()).getTime() + TZ_OFFSET
        );
        if (val === "in") await userCheckin(user?._id, today, time);
        else {
          await userCheckout(user?._id, today, time);
        }
        setSuccess('Success')
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
    }
  };
  return (
    <>
      <Button
        className="w-100"
        style={{ backgroundColor: check === "in" ? "#207398" : "#1C8D73" }}
        onClick={() => handleCheck(check)}
        appearance="danger"
      >
        {check === "in" ? "Check In" : "Check Out"}
      </Button>
      {error && (
        <AlertDismiss message={error} setError={setError} variant="danger" />
      )}
      {success && (
        <AlertDismiss
          message={`Check${check} Succesful`}
          setError={setSuccess}
        />
      )}
    </>
  );
};

export default CheckIn;
