import React from "react";
import "./Hero.scss";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import COLOR from "../../constants/colors";

const Hero = (props) => {
  return (
    <Container fluid="none" className="hero-container">
      <Image
        src="https://fitso-images.curefit.co/uploads/DesktopCityHighRes1629060550.png"
      />
      <Container fluid="none" className="hero-details text-light">
        <Row>
          <h1 className="display-1 fw-bold">Fitzo</h1>
        </Row>
        <Row>
          <h5 className="display-5">Your Health Partner</h5>
        </Row>
        <Row style={{ width: "30rem", height: "3.6rem", marginTop: "3.1rem" }}>
          <Button
            className="px-5 py-2"
            style={{ background: COLOR.PEACH, border: "none", fontSize: '14px', boxShadow: 'none' }}
          >
            Book Free Trial
          </Button>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
