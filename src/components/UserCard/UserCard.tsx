import React, { useCallback } from "react";
import { Card, Row } from "react-bootstrap";
import AvatarCircle from "../../common/Avatar";
import CheckIn from "../CheckIn/CheckIn";
import NewUser from "../NewUser/NewUser";
import DeleteUser from "../DeleteUser/DeleteUser";

const UserCard = ({ user }) => {
  const getAvatar = useCallback(() => {
    const firstLetter = user?.firstName?.charAt(0).toLowerCase();
    return `/assets/images/avatars/${firstLetter}-circle.png`;
  }, [user]);
  return (
    <Card className="activity-card">
      <Card.Body>
        <Row className="my-3">
          <CheckIn user={user} check="in" />
        </Row>
        <Row className="my-3">
          <CheckIn user={user} check="out" />
        </Row>
        <Row className="my-3 justify-content-between">
          <NewUser update preUser={user} />
          <DeleteUser user={user} />
        </Row>
      </Card.Body>
      <Card.Body>
        <Card.Title className="text-capitalize fw-normal">
          {user?.firstName} {user?.lastName}
        </Card.Title>
        <Card.Text className="text-capitalize">{user?.role}</Card.Text>
        <Card.Text>{user?.email}</Card.Text>
        <Card.Text>{user?.phone}</Card.Text>
      </Card.Body>
      <Card.Body className="px-1" style={{ flex: 0 }}>
        <AvatarCircle src={getAvatar()} />
      </Card.Body>
    </Card>
  );
};

export default UserCard;
