import React from "react";
import { Container } from "react-bootstrap";
import Icon from "../../common/Icon";
import { Link, useParams } from "react-router-dom";
import "./Sidebar.scss";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { signout } = useAuth();
  return (
    <Container
      className="position-fixed start-0 top-0 vh-100"
      style={{ background: "#000101", width: "100px" }}
      id="sidebar"
    >
      <div className="sidebar-header"></div>
      <ul
        className="list-unstyled components d-flex flex-column align-items-center justify-content-center"
        style={{ height: "90%" }}
      >
        <li className="active my-4">
          <Link to="./" className="p-4">
            <span>
              <Icon fa icon="home" color="white" type="light" size={30} />
            </span>
          </Link>
        </li>
        <li className="active my-4">
          <Link to="./profile" className="p-4">
            <Icon fa icon="user" color="white" type="light" size={30} />
          </Link>
        </li>
        <li className="active my-4">
          <Link to="./past" className="p-4">
            <Icon fa icon="clock" color="white" type="light" size={30} />
          </Link>
        </li>
        <li className="active my-4">
          <Link to="./membership" className="p-4">
            <Icon fa icon="money-check" color="white" type="light" size={30} />
          </Link>
        </li>
      </ul>
      <div className="active my-4">
        <Link onClick={signout} to="" className="p-4">
          <Icon fa icon="power-off" color="white" type="light" size={30} />
        </Link>
      </div>
    </Container>
  );
};

export default Sidebar;
