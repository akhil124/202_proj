import React, { useEffect } from "react";
import "./ActivityList.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { activityType } from "../../constants/activityConstants";
import { getActivitiesByLocation } from "../../services/activityService";
import { useAuth } from "../../hooks/useAuth";

const ActivityList = ({ city, style = {} }) => {
  const [activities, setActivities] = React.useState([]);
  const { user } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const res = await getActivitiesByLocation(city);
        setActivities(res.data);
      } catch (err) {
        console.log(err);
        setActivities([]);
      }
    })();
  }, [city]);

  const getBackground = (name: string) =>
    activityType?.[name]?.background
      ? activityType?.[name]?.background
      : "rgb(237, 244, 255)";

  return (
    <Container style={{ maxWidth: "1100px", ...style }}>
      {!user || user?.role !== "admin" && (
        <Row className="my-4 ">
          <h3 className="p-0 mb-4" style={{ fontWeight: 400 }}>
            Activities in your area
          </h3>
          <p className="thinline"></p>
        </Row>
      )}
      <Row className="my-4">
        {activities?.map((activity) => (
          <Col sm="6" lg="4" className="my-2">
            <Link to={`/${city}/${activity.name}`}>
              <Card
                className="activity-card"
                style={{ backgroundColor: getBackground(activity?.name) }}
              >
                <Card.Img
                  src={`/assets/images/${
                    activityType?.[activity?.name]?.thumbnail || "boxing"
                  }.svg`}
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
