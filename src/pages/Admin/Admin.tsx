import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import NewUser from "../../components/NewUser/NewUser";
import LocationInput from "../../common/LocationInput";
import Userlist from "../../components/Userlist/Userlist";
import UserGroup from "../../components/UserGroup/UserGroup";
import ActivityList from "../../components/ActivityList/ActivityList";
import ActivityGroup from "../../components/ActivityGroup/ActivityGroup";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("user") && navigate("/auth");
  }, [user]);

  return (
    <Container fluid="none">
      <Header />
      <Sidebar />
      <div className="float-end p-4" style={{ width: "calc(100% - 100px)" }}>
        <Row>
          <UserGroup />
        </Row>
        <Row>
          <ActivityGroup />
        </Row>
      </div>
    </Container>
  );
};

export default Admin;
