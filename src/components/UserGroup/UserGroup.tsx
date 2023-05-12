import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Userlist from "../Userlist/Userlist";
import NewUser from "../NewUser/NewUser";
import CheckIn from "../CheckIn/CheckIn";
import UserCard from "../UserCard/UserCard";

const UserGroup = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);

  return (
    <Container fluid="none mb-5" style={{ maxWidth: "600px" }}>
      <p className="h4 my-1">UserGroup</p>
      <Row className="my-3">
        <Col>
          <Userlist setSelectedUser={setSelectedUser} />
        </Col>
        <Col>
          <NewUser />
        </Col>
      </Row>
      <Row>
        <Col>
          {selectedUser && <UserCard user={selectedUser} />}
        </Col>
      </Row>
    </Container>
  );
};

export default UserGroup;
