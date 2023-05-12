import React, { useMemo, useState } from "react";
import "./MembershipInfo.scss";
import { Container, Row, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import COLOR from "../../constants/colors";
import Header from "../Header/Header";
import { useAuth } from "../../hooks/useAuth";
import AlertDismiss from "../../common/Alert";

const MembershipInfo = () => {
  const { response } = useApi(`/subscription/all`, "get");
  const [error, setError] = useState("");
  const Subscriptions = useMemo(() => response?.data ?? [], [response]);
  const { location = "hyderabad" } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const discCalucate = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const handleSubmit = (membership) => {
    if (!user) {
      setError("Please login to purchase a membership");
    } else {
      window.localStorage.setItem("payment", JSON.stringify(membership));
      navigate("/payment")
    }
  };

  return (
    <Container fluid="none" className="membership-container">
      <Header city={location}></Header>
      {error && <AlertDismiss message={error} setError={setError} />}
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
              style={{
                background: membership?.most_popular ? "#212529" : COLOR.PEACH,
                border: "none",
              }}
              onClick={() => handleSubmit(membership)}
            >
              {membership?.type === "Trial" ? "Free Trial" : "Buy Now"}
            </Button>
          </Container>
        ))}
      </Row>
    </Container>
  );
};

export default MembershipInfo;
