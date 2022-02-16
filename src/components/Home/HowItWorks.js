import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Fade from "react-reveal/Fade";

function HowItWorks() {
  return (
    <Container className="my-5 font-link">
      <Row className="my-5">
        <Col xs={12} className="d-flex justify-content-center secondary-color">
          <h2>How it works?</h2>
        </Col>
      </Row>
      <Row className="how-section d-flex justify-content-center">
        <Col md={6} s={12}>
          <h4 className="d-flex justify-content-center secondary-color">
            Start fundraising
          </h4>
          <ol className="step pl-0">
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">1</span>
              </div>
              <div className="step-excerpt">
                <Fade left>
                  <h5 className="font-weight-bold dark-grey-text mb-3">
                    {" "}
                    Sign in with Near account{" "}
                  </h5>
                </Fade>
              </div>
            </li>
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">2</span>
              </div>
              <div className="step-excerpt">
                <Fade left>
                  <h5 className="font-weight-bold dark-grey-text mb-3">
                    {" "}
                    Create a new project{" "}
                  </h5>
                </Fade>
              </div>
            </li>
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">3</span>
              </div>
              <div className="step-excerpt">
                <Fade left>
                  <h5 className="font-weight-bold dark-grey-text mb-3">
                    {" "}
                    Wait until get funded{" "}
                  </h5>
                </Fade>
              </div>
            </li>
          </ol>
        </Col>
        <Col md={6} s={12}>
          <h4 className="d-flex justify-content-center secondary-color">
            Start funding
          </h4>
          <ol className="step pl-0">
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">1</span>
              </div>
              <div className="step-excerpt">
                <Fade right>
                  <h5 className="font-weight-bold dark-grey-text mb-3">
                    {" "}
                    Browse the exisiting project{" "}
                  </h5>
                </Fade>
              </div>
            </li>
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">2</span>
              </div>
              <div className="step-excerpt">
                <Fade right>
                  <h5 className="font-weight-bold dark-grey-text mb-3">
                    Sign in with Near account{" "}
                  </h5>
                </Fade>
              </div>
            </li>
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">3</span>
              </div>
              <div className="step-excerpt">
                <Fade right>
                  <h5 className="font-weight-bold dark-grey-text mb-3">
                    {" "}
                    Donate to your liked project{" "}
                  </h5>
                </Fade>
              </div>
            </li>
          </ol>
        </Col>
      </Row>
    </Container>
  );
}

export default HowItWorks;
