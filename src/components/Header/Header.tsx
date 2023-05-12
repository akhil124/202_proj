import React, { useCallback } from "react";
import "./Header.scss";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LocationInput from "../../common/LocationInput";
import AvatarCircle from "../../common/Avatar";

const Header = ({ city }: { city?: string }) => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const onChange = (loc) => {
    const path = loc?.value;
    navigate(`/${path}`);
  };

  const getAvatar = useCallback(() => {
    const firstLetter = user?.firstName?.charAt(0).toLowerCase();
    return `/assets/images/avatars/${firstLetter}-circle.png`;
  }, [user]);

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="header p-sm-4"
      style={{ position: "sticky", top: "0", zIndex: 1000 }}
    >
      <Container>
        <Navbar.Brand href="/webapp">
          <h3 className="logo">FitZo</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav style={{ alignItems: "center" }}>
            {city && <LocationInput onChange={onChange} />}
            {user?.role === "non-member" && (
              <Nav.Link href="/webapp/membership">Membership</Nav.Link>
            )}
            {user ? (
              <Nav.Link onClick={() => navigate("/user")}>
                <AvatarCircle src={getAvatar()} />
              </Nav.Link>
            ) : (
              <Nav.Link href="/webapp/auth">Sign In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
