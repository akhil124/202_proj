import React, { useMemo } from "react";
import "./ActivityList.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { activityType } from "../../constants/activityConstants";
import COLOR from "../../constants/colors";

const ActivityList = ({ city }: { city: string }) => {
  const { response, error, loading } = useApi(
    `/activities/location/${city}`,
    "get"
  );
  const activities = useMemo(() => response?.data ?? [], [response]);
  const getImageIcon = (name: string) =>
    activityType?.[name]?.icon
      ? activityType?.[name]?.icon
      : "https://fitso-images.curefit.co/uploads/swimming_web1625775914.png";

  const getBackground = (name: string) =>
    activityType?.[name]?.background
      ? activityType?.[name]?.background
      : 'rgb(237, 244, 255)';

  return (
    <Container className="container-xxl" style={{ maxWidth: "1100px" }}>
      <Row className="my-4">
        <h3 className="p-0 mb-4" style={{ fontWeight: 400 }}>
          Activities in your area
        </h3>
        <p className="thinline"></p>
      </Row>
      <Row className="my-4">
        {activities?.map((activity) => (
          <Col sm="6" lg="4" className="my-2">
            <Link to={activity.name}>
              <Card
                className="activity-card"
                style={{ backgroundColor: getBackground(activity?.name) }}
              >
                <Card.Img
                  src={getImageIcon(activity?.name)}
                  className="activity-img"
                />
                <Card.Body>
                  <Card.Title className="text-capitalize fw-normal">
                    {activity?.name}
                  </Card.Title>
                  <Card.Text style={{ color: "#ff3866" }}>
                    {activity?.slots?.length} Slots available
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ActivityList;
