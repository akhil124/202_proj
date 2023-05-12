import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import FlagAlert from "./Flag";

const AlertDismiss = ({ message, setError, variant = "primary" }) => {
  const [show, setShow] = useState(true);

  const onClose = () => {
    setShow(false);
    setError("");
  };
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  });

  if (show) {
    return (
      <div style={{
            position: "fixed",
            right: "50px",
            top: "24px",
            minWidth: "300px",
            width: "300px",
            transition: "all 1s ease-in-out !important",
            zIndex: 9999,
          }}>
        <FlagAlert message={message} success={variant !== "danger"} />
      </div>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
};

export default AlertDismiss;
