import React from "react";
import { Row, Col } from "react-bootstrap";
import TitledText from "../../TitledText";
// import hands from "../../img/hands.jpg";
import hands from "../../img/main/20943414.jpg";

function MainSection() {
  return (
    <Row className="home-cover d-flex align-items-center justify-content-center bg-gray font-link">
      <Col
        xs={9}
        md={5}
        className="px-md-5 my-2"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <TitledText
          title="Let us Support"
          text="Pay it forward you will need that one day"
        />
      </Col>
      <Col
        xs={12}
        md={6}
        style={{ marginTop: "-30px;" }}
        className="bg-image d-flex justify-content-center px-lg-5"
      >
        <img
          src={hands}
          alt="Let's support"
          style={{ height: "400px", marginTop: "-30px;" }}
        />
      </Col>
    </Row>
  );
}

export default MainSection;
