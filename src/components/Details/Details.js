import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import help from "../../img/help.jpg";

import {
  Col,
  Container,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "./Details.css";

export default function Details({ contract, currentUser, donate, signIn }) {
  const { projectId } = useParams();

  const [project, setProject] = useState([]);
  useEffect(() => {
    // update the list of projects by invoking the getProject
    // method on the smart contract
    const getProjectbyId = () => {
      const intId = parseInt(projectId);
      contract.getProject({ projectId: intId }).then((result) => {
        console.log("project", result);
        setProject(result);
      });
    };
    getProjectbyId();
  }, [contract, projectId]);
  return (
    <>
      <section id="portfolio-details" className="portfolio-details">
        <Container>
          <Row className="row gy-4">
            <Col xs={6}>
              <div className="portfolio-details-slider swiper align-items-center">
                <img src={help} alt={project.name} />
              </div>
            </Col>

            <Col xs={6}>
              <div className="portfolio-info">
                <h3>{project.name} Details</h3>
                <ul>
                  <li>
                    <strong>Needed Funds</strong>: {project.funds}
                  </li>
                  <li>
                    <strong>Recived Funds</strong>: {project.received}
                  </li>
                  <li>
                    <strong>Residual Funds</strong>: {project.residual}
                  </li>
                </ul>

                {currentUser ? (
                  <Row>
                    <Col md={6}>
                      {project.residual != 0 ? (
                        <Button
                          variant="outline-warning"
                          onClick={() =>
                            donate(project.address, project.id, "5")
                          }
                        >
                          {" "}
                          Donate with 5 Near
                        </Button>
                      ) : (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              Project is fully funded!
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <Button
                              disabled
                              as={Col}
                              variant="outline-warning"
                              className="p-2 mx-2"
                              style={{ pointerEvents: "none" }}
                            >
                              Donate with 5 Near
                            </Button>
                          </span>
                        </OverlayTrigger>
                      )}
                    </Col>
                    <Col md={6}>
                      {project.residual != 0 ? (
                        <Button
                          variant="secondary"
                          onClick={() =>
                            donate(project.address, project.id, "10")
                          }
                        >
                          {" "}
                          Donate with 10 Near
                        </Button>
                      ) : (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              Project is fully funded!
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <Button
                              disabled
                              as={Col}
                              variant="secondary"
                              style={{ pointerEvents: "none" }}
                            >
                              Donate with 10 Near
                            </Button>
                          </span>
                        </OverlayTrigger>
                      )}
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md={6}>
                      <Button
                        as={Col}
                        variant="outline-warning"
                        className="p-2 mx-2"
                        onClick={signIn}
                      >
                        {" "}
                        Donate with 5 Near
                      </Button>
                    </Col>
                    <Col md={6}>
                      <Button
                        as={Col}
                        variant="outline-warning"
                        className="p-2 mx-2"
                        onClick={signIn}
                      >
                        {" "}
                        Donate with 10 Near
                      </Button>
                    </Col>
                  </Row>
                )}
              </div>

              <div className="portfolio-description">
                <h2>Description</h2>
                <p>{project.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {project.residual != 0 ? (
        <section id="cta" className="cta">
          <Container className="container" data-aos="zoom-in">
            <div className="text-center">
              <h3>Do You Like This Project?</h3>
              <p> Why you do not give the the whole fund </p>
              {currentUser ? (
                <Button
                  className="cta-btn"
                  onClick={() =>
                    donate(project.address, project.id, project.residual)
                  }
                >
                  Complete the needed Fund
                </Button>
              ) : (
                <Button className="cta-btn" onClick={signIn}>
                  Complete the needed Fund
                </Button>
              )}
            </div>
          </Container>
        </section>
      ) : (
        <section id="cta" className="cta">
          <Container className="container" data-aos="zoom-in">
            <div className="text-center">
              <h3>The project is successfully funded </h3>
              <p> Why you do not you fund another one? </p>
              <Button
                className="cta-btn"
                onClick={() => window.location.replace("/allprojects")}
              >
                List other pojects
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
