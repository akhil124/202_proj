import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Auth() {
  const [justifyActive, setJustifyActive] = useState("login");
  const { user, signin, signup } = useAuth();

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  useEffect(() => {
    if (user) {
      window.location.href = "/webapp/user";
    }
  }, [user]);

  return (
    <>
      <Header />
      <MDBContainer
        className="p-3 my-5 d-flex flex-column w-50"
        style={{ maxWidth: "500px" }}
      >
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("login")}
              active={justifyActive === "login"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("register")}
              active={justifyActive === "register"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "login"}>
            <Login callback={handleJustifyClick} onSubmit={signin}/>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "register"}>
            <Register onSubmit={signup} oAuth={true}/>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </>
  );
}

export default Auth;
