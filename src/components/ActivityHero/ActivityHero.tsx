import React, { useMemo } from "react";
import { Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import "./ActivityHero.scss";
import Icon from "../../common/Icon";
import useApi from "../../hooks/useApi";
import Membership from "../../pages/Membership/Memebership";
import { useParams } from "react-router-dom";
import { activityType } from "../../constants/activityConstants";

const ActivityHero = () => {
  const { activity = "boxing" } = useParams();

  return (
    <>
      <Container fluid="xxl">
        <Row sm={12}>
          <Col>
            <Image
              src={`/assets/images/${
                activityType?.[activity]?.thumbnail || "boxing"
              }.svg`}
              alt=""
              style={{ width: "100%", height: "100%", maxHeight: "500px" }}
            />
          </Col>
          <Col className="my-5">
            <h1 className="text-capitalize fw-bold display-4 mb-4">
              {activity}
            </h1>
            <div className="amenities">
              <p className="h3 mb-4">Amenities</p>

              <div className="amenity mb-3">
                <Icon icon="https://fitso-images.curefit.co/uploads/indoor.png" size={45} />
                <span className="mx-2 amenity-text">Premium Activity</span>
              </div>
              <div className="amenity mb-3">
                <Icon icon="https://fitso-images.curefit.co/uploads/coach.png" size={45} />
                <span className="mx-2 amenity-text">
                  Certified Coaches for Guidance
                </span>
              </div>
              <div className="amenity mb-3">
                <Icon icon="https://fitso-images.curefit.co/uploads/locker.png" size={45} />
                <span className="mx-2 amenity-text">
                  Showers, Changing rooms &amp; Lockers Available
                </span>
              </div>
              <div className="amenity mb-3">
                <Icon icon="https://fitso-images.curefit.co/uploads/Structured.png" size={45} />
                <span className="mx-2 amenity-text">Skill Assessment System</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ActivityHero;
