import { MDBContainer, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import COLOR from "../../constants/colors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { subscribe } from "../../services/userService";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const [paid, setPaid] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const onSubmit = async (e) => {
    try {
      const item = JSON.parse(window.localStorage.getItem("payment"));
      setState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
      });
      const res = await subscribe(user?._id, item?._id);
      setPaid(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (paid) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [paid]);

  useEffect(() => {
    const item = window.localStorage.getItem("payment");
    if (!item) {
      navigate("/");
    }
  }, []);

  return (
    <Container
      className="d-flex justify-content-center flex-column"
      style={{ height: "100vh", width: "100vw" }}
    >
      {paid ? (
        <Row className="w-75 mx-auto mb-5">
          <Col>
            <h1 className="my-4 text-center display-4 fw-bold">
              Payment Successful
            </h1>
            <Image
              src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif"
              style={{ margin: "5% 30%" }}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row className="w-75 mx-auto mb-5">
            <Col>
              <h1>Payment</h1>
            </Col>
          </Row>
          <Row className="w-75  mx-auto mb-5">
            <Col className="mb-4">
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
            </Col>
            <Col className="mb-4">
              <MDBContainer>
                <MDBInput
                  wrapperClass="mb-4"
                  type="number"
                  name="number"
                  label="Card Number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  type="text"
                  name="name"
                  label="Name on Card"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <Row>
                  <Col>
                    <MDBInput
                      wrapperClass="mb-4 "
                      type="expiry"
                      name="expiry"
                      label="Expiry"
                      value={state.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </Col>
                  <Col>
                    <MDBInput
                      wrapperClass="mb-4 "
                      type="cvc"
                      name="cvc"
                      label="CVV/CVC"
                      value={state.cvc}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </Col>
                </Row>{" "}
              </MDBContainer>
            </Col>
          </Row>
          <Row className="w-75  mx-auto mb-5">
            <Col>
              <Button
                className="px-5 py-2 w-50"
                disabled={
                  !state.number || !state.expiry || !state.cvc || !state.name
                }
                style={{
                  background: COLOR.PEACH,
                  border: "none",
                  fontSize: "14px",
                  boxShadow: "none",
                  float: "right",
                }}
                onClick={onSubmit}
              >
                Pay
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PaymentForm;
