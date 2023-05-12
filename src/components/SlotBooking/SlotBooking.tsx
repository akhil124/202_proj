import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Slots from "./Slots";
import TZ_OFFSET from "../../constants/time";

const SlotBooking = () => {
  const { location = "hyderabad", activity = "boxing" } = useParams();
  const [date, setDate] = useState(
    new Date(new Date(new Date().toDateString()).getTime() + TZ_OFFSET)
  );
  useEffect(() => {
  }, [date]);
  const onChange = (date: Date) => {
    setDate(() => new Date(date.getTime() + TZ_OFFSET));
  };
  return (
    <Container
      fluid="xxl"
      style={{
        padding: "3rem 0px 5.2rem",
        backgroundColor: "rgb(247, 250, 255)",
      }}
    >
      <Row className="m-5" style={{}}>
        <Col>
          <h1>Slot Booking</h1>
        </Col>
        <Col
          style={{
            background: "white",
            borderRadius: "0.8rem",
            padding: "30px",
          }}
        >
          <DatePicker onChange={onChange} value={date} minDate={new Date()}/>
          <Slots location={location} activity={activity} date={date} />
        </Col>
      </Row>
    </Container>
  );
};

export default SlotBooking;
