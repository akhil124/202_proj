import React from "react";
import { Container } from "react-bootstrap";

//Container with rounded corners and shadow
const Card = ({ children, className='', style={} }) => {
  return (
    <Container className={`p-3 rounded shadow ${className}`} style={style}>
      {children}
    </Container>
  );
};

export default Card;
