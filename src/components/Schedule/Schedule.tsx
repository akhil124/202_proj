import React, { useEffect, useMemo } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import Card from "../../common/Card";
import useApi from "../../hooks/useApi";
import TZ_OFFSET from "../../constants/time";
import { activityType } from "../../constants/activityConstants";
import Icon from "../../common/Icon";
import Class from "./Class";

//Container with rounder
const Schedule = ({ user, date = new Date() }) => {
  const { response } = useApi(`/user/slot/${user?._id}`, "get");
  const slotlist = useMemo(() => response?.data, [response]);

  //Function to Filter out the slots for today from the slotlist.date
  const filterToday = (slotlist) => {
    const today = new Date(new Date(date.toDateString()).getTime() + TZ_OFFSET);
    return slotlist?.filter((slot) => {
      return slot.date === today.toISOString();
    });
  };

  const filteredSlots = useMemo(() => filterToday(slotlist), [slotlist, date]);

  return (
    <Container style={{ maxWidth: "800px", marginLeft: "0" }}
    >
      <Row>
        <h3 className="h3 p-0">Classes for today</h3>
      </Row>
      <Row>
        {filteredSlots?.map((slot) => (
          <Class slot={slot} user={user} key={slot._id}/>
        ))}
      </Row>
    </Container>
  );
};

export default Schedule;
