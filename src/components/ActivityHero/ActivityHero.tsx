import React, { useMemo } from "react";
import { Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import "./ActivityHero.scss";
import Icon from "../../common/Icon";
import useApi from "../../hooks/useApi";
import Membership from "../../pages/Membership/Memebership";

const ActivityHero = () => {
  const { response, error, loading } = useApi(
    `/activities/boxing/location/hyderabad`,
    "get"
  );
  const Activities = useMemo(() => response?.data ?? [], [response]);
  console.log(Activities, "acts");
  // const { location = "hyderabad" } = useParams();

  return (
    <>
      <Container fluid="xxl">
        <Row>
          <Col>
            <Image src="/assets/images/taxi-swimming.png" />
            <Icon fa type="duotone" icon="transgender" color="white" />
          </Col>
          <Col>
            <h1>Activity Name</h1>
            <h4>Tag line</h4>
            <Icon fa type="solid" icon="user-ninja" color="black" />
            <div className="amenities">
              <p className="heading">Amenities</p>
              <div className="amenity">
                <div className="amenity-icon">
                  <div className="sc-pNWdM otoxA"></div>
                  <img
                    alt="Premium Swimming Pools"
                    src="https://fitso-images.curefit.co/uploads/indoor.png"
                    loading="lazy"
                    className="sc-kEqXSa ivNGVQ"
                  />
                </div>
                <span className="amenity-text">Premium Swimming Pools</span>
              </div>
              <div className="amenity">
                <div className="amenity-icon">
                  <div className="sc-pNWdM otoxA"></div>
                  <img
                    alt="Certified Coaches for Guidance"
                    src="https://fitso-images.curefit.co/uploads/coach.png"
                    loading="lazy"
                    className="sc-kEqXSa ivNGVQ"
                  />
                </div>
                <span className="amenity-text">
                  Certified Coaches for Guidance
                </span>
              </div>
              <div className="amenity">
                <div className="amenity-icon">
                  <div className="sc-pNWdM otoxA"></div>
                  <img
                    alt="Showers, Changing rooms &amp; Lockers Available"
                    src="https://fitso-images.curefit.co/uploads/locker.png"
                    loading="lazy"
                    className="sc-kEqXSa ivNGVQ"
                  />
                </div>
                <span className="amenity-text">
                  Showers, Changing rooms &amp; Lockers Available
                </span>
              </div>
              <div className="amenity">
                <div className="amenity-icon">
                  <div className="sc-pNWdM otoxA"></div>
                  <img
                    alt="Skill Assessment System"
                    src="https://fitso-images.curefit.co/uploads/Structured.png"
                    loading="lazy"
                    className="sc-kEqXSa ivNGVQ"
                  />
                </div>
                <span className="amenity-text">Skill Assessment System</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="activity-wrapper">
        <p style={{ display: "flex", justifyContent: "center" }}>
          Booking Slot for {Activities.name}
        </p>
        <Row className="activity-container">
          <Tabs className="tab-container">
            <Tab eventKey="home" title="Today">
              {Activities.slots?.map((activity) => (
                <Row className="time-slot">
                  <p>{activity?.start_time}</p>
                  <Icon fa type="duotone" icon="whistle" color="black" ></Icon>
                </Row>
              ))}
            </Tab>
            <Tab eventKey="home" title="Tomorrow"></Tab>
          </Tabs>
        </Row>
      </Container>
      <Container></Container>
    </>
  );
};

export default ActivityHero;
