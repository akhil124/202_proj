// import "./Activity.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import React from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import ActivityHero from "../../components/ActivityHero/ActivityHero";
import MembershipInfo from "../../components/MembershipInfo/MembershipInfo"

const Membership = () => {
    // const {location = "hyderabad"}  = useParams();
    return (
      <div className="home">
        {/* <Header city={location}/> */}
        {/* <Hero /> */}
        {/* <ActivityList city={location} /> */}
        {<MembershipInfo/>}
      </div>
    );
  };

  export default Membership