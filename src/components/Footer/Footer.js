import React from "react";

import { Row, Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <Container fluid>
      <Row
        className="px-3 flex justify-content-center "
        style={{ backgroundColor: "gray" }}
      >
        <Col xs={12} md={8} lg="auto" className="my-4">
          <p>Made with &#10084; by Rasha Abdulrazzak &copy; Copyright 2022</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
