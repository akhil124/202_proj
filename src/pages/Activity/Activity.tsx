import "./Activity.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import React from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import ActivityHero from "../../components/ActivityHero/ActivityHero";

const Activity = () => {
  const { location = "hyderabad" } = useParams();
  return (
    <Container fluid="xxxl">
      <Header city={location} />
      <ActivityHero />
    </Container>
  );
};

export default Activity;
