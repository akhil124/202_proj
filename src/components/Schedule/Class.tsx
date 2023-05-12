import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Card from "../../common/Card";
import Icon from "../../common/Icon";
import { activityType } from "../../constants/activityConstants";
import { removeUserFromSlot } from "../../services/slotServices";
import { set } from "mongoose";

//Get time from HYD0600 format with AM or PM with edge cases for 12
const getTime = (slotId) => {
  const time = slotId.slice(3);
  const hour = time.slice(0, 2);
  const min = time.slice(2);
  if (hour === "12") {
    return `${hour}:${min} PM`;
  } else if (hour > "12") {
    return `${hour - 12}:${min} PM`;
  } else {
    return `${hour}:${min} AM`;
  }
};

const Class = ({ slot, user }) => {
  const [selected, setSelected] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleCancel = async () => {
    try {
      const res = await removeUserFromSlot(
        slot.date,
        slot.activityname,
        slot.slotId,
        user._id
      );
      setSuccess("Class Cancelled");
    } catch {
      setError("Error cancelling class");
    }

    setRemoved(true);
  };
  return (
    <>
      {!removed && (
        <Col>
          <Card className="m-2" style={{ width: "250px" }}>
            <Row className="align-items-center">
              <Col>
                <div
                  className="rounded-circle"
                  style={{
                    background: "rgb(237, 244, 255)",
                    padding: "15px",
                    maxWidth: "60px",
                  }}
                >
                  <Image
                    src={`/assets/images/${
                      activityType?.[slot.activityname]?.thumbnail || "boxing"
                    }-small.png`}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              </Col>
              <Col>
                <p className="h5 text-capitalize fw-bold">
                  {slot.activityname}
                </p>
                <p className="h6 text-capitalize">{getTime(slot.slotId)}</p>
              </Col>
              <Col
                className="btn shadow-none p-0"
                style={{ flex: "0 0 0" }}
                onClick={() => setSelected(() => !selected)}
              >
                <Icon fa icon="ellipsis-v" type="light" />
              </Col>
            </Row>
          </Card>
          {
            //If selected is true then show the details
            selected && (
              <p
                className="m-2 p-2 rounded btn fw-bold"
                style={{ background: "rgba(255, 0, 0, 0.2)", width: "250px" }}
                onClick={handleCancel}
              >
                Cancel
              </p>
            )
          }
        </Col>
      )}
    </>
  );
};

export default Class;
