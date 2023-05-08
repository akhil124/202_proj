import React, { useMemo } from "react";
import "./MembershipInfo.scss";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { activityType } from "../../constants/activityConstants";
import COLOR from "../../constants/colors";
import Header from "../Header/Header";

const MembershipInfo = () => {
  const { response, error, loading } = useApi(`/subscription/all`, "get");
  const Subscriptions = useMemo(() => response?.data ?? [], [response]);
  const { location = "hyderabad" } = useParams();

  const discCalucate = (price, discount) => {
    return price - (price * discount) / 100;
  };
  const getFitzoIcon = () =>
    "https://fitso-images.curefit.co/uploads/fitso-logo1628748943.png";

  const fitzoIcon = () =>
    "https://fitso-images.curefit.co/uploads/PurchaseBgImage.png";
  return (
    <Container fluid="none" className="membership-container">
      <Header city={location}></Header>
      <Row className="image-container">
        <Image
          className="image-header"
          src="https://fitso-images.curefit.co/uploads/PurchaseBgImage.png"
        ></Image>
      </Row>
      <Row style={{ position: "absolute", top: "30%", width: "100%" }}>
        <p className="header-text">MEMBERSHIP</p>
      </Row>
      <h2 className="products-title" style={{ margin: 30 }}>
        Choose your plan
      </h2>
      <Row className="items-container">
        {Subscriptions?.map((membership) => (
          <Container
            fluid="none"
            className={`product-wrapper ${
              membership?.most_popular ? "most-popular" : ""
            }`}
          >
            <Row>
              {membership?.most_popular && (
                <p className="most-popular-title">MOST POPULAR</p>
              )}
            </Row>
            <p className="text-bold">{membership.validity}</p>
            <p className="text-card">days</p>
            <Row>
              <p className="text-card">
                <span className="discount-text">
                  {membership.discount}% off{" "}
                </span>
                <span
                  className="px-3"
                  style={{ textDecoration: "line-through" }}
                >
                  ${membership.price}
                </span>
                {/* {membership.discount}% OFF on ${membership.price} */}
              </p>
            </Row>
            <p className="text-bold">
              {" "}
              ${discCalucate(membership.price, membership.discount)}
            </p>
            <p>
              just $
              {(
                discCalucate(membership.price, membership.discount) /
                membership.validity
              ).toFixed(2)}
              /day{" "}
            </p>
            {/* <p> just $2/day</p> */}
            <hr />
            <Button
              className="px-5 py-2 mb-3"
              style={{ background: membership?.most_popular ? "#212529" : COLOR.PEACH, border: "none" }}
            >
              {membership?.type === "Trial" ? "Free Trial" : "Buy Now"}
            </Button>
          </Container>
        ))}
      </Row>
    </Container>
  );
};

const newComp = () => {};

const oldComp = ({ Subscriptions }) => (
  <div>
    <div className="klXHNl header-background">
      <img
        alt="header background"
        src="https://fitso-images.curefit.co/uploads/PurchaseBgImage.png"
        loading="lazy"
        className="sc-kEqXSa ivNGVQ"
      ></img>
    </div>
    <div className="header">
      <p className="product-name">MEMBERSHIP</p>
      <p className="city-name">Hyderabad</p>
    </div>
    {/* </div> */}
    <h2 className="products-title">Choose your plan</h2>
    <div className="product-wrapper">
      {Subscriptions?.map((membership) => (
        <div className="membership-container">
          <p className="duration">{membership.validity}</p>
          <p className="duration-text">days</p>
          <div className="discount-container">
            <p className="discount-text">20% off</p>
            <p className="price"> 150</p>
          </div>
          <p className="retail-price">120</p>
          <p className="per-day-text">just $2/day</p>
          <div className="separator">
            <hr />
          </div>
          <div>
            <p className="card-footer">Buy now</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default MembershipInfo;
