import React from "react";

import { Row, Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <Container fluid>
      <Row
        className="px-3 flex justify-content-center font-link"
        style={{ backgroundColor: "#212529 " }}
      >
        <Col
          xs={12}
          md={8}
          lg="auto"
          className="my-4"
          style={{ color: "white" }}
        >
          <p>Made with &#10084; by Rasha Abdulrazzak &copy; Copyright 2022</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
