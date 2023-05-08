import React, { useEffect, useMemo, useState } from "react";
import "./Header.scss";
import Container from "react-bootstrap/Container";
import { Nav, Navbar, Form, ListGroup, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

const Header = ({ city }: { city?: string }) => {
  const {
    response: locations = [],
    error,
    loading,
  } = useApi(`/assets/json/location.json`, "get");

  const { user, signout } = useAuth();

  const [locationInput, setLocation] = useState("");

  const filteredLocations = useMemo(() => {
    return locations?.filter((l) =>
      l.name.toLowerCase().startsWith(locationInput.toLowerCase())
    );
  }, [locationInput, locations]);

  return (
    <Navbar bg="light" expand="lg" className="header p-sm-4">
      <Container>
        <Navbar.Brand href="/webapp">
          <h3 className="logo">FitZo</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {city && (
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Accordion className="mx-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="p-0">
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder={city}
                      value={locationInput}
                      className="h5 px-4 py-1 m-0"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                      {filteredLocations?.map((item) => (
                        <ListGroup.Item key={item.name}>
                          <Link
                            to={`/${item.name}`}
                            className="text-capitalize"
                            onClick={window.location.reload}
                          >
                            <h5 className="p-1 m-0">{item.name}</h5>
                            <h6 className="p-1 m-0">{item.state}</h6>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Nav.Link href="/webapp/membership">Membership</Nav.Link>
              {user ? (
                <Nav.Link onClick={signout}>Sign Out</Nav.Link>
              ) : (
                <Nav.Link href="/webapp/auth">Sign In</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
