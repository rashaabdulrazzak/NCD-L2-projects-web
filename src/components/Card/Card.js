import React from "react";
import { Col, Button, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Card.css";
import help from "../../img/help.jpg";

export default function Card({ project, currentUser, donate, signIn }) {
  const { id, name, description, funds, received, residual } = project;
  return (
    <Col md={3} className="card">
      <Link to={{ pathname: `/projects/${id}` }} className="links">
        <img src={help} alt={name} />
      </Link>
      <div className="card-body">
        <h2>{name}</h2>
        <p>{description}</p>
        <p className="funds">
          Needed Funds: <span style={{ fontWeight: 400 }}>{funds} </span>
        </p>
        <p className="funds">
          Received Fund:
          <span style={{ fontWeight: 400 }}> {received}</span>
        </p>
        <p className="funds">
          Residual:
          <span style={{ fontWeight: 400 }}> {residual}</span>
        </p>

        {currentUser ? (
          <Row>
            <Col md={6}>
              {project.residual != 0 ? (
                <Button
                  variant="outline-warning"
                  onClick={() => donate(project.address, project.id, "5")}
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
                      as={Col}
                      variant="outline-warning"
                      className="p-2 mx-2 disabled"
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
                  onClick={() => donate(project.address, project.id, "10")}
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
                      as={Col}
                      className="p-2 mx-2 disabled"
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
    </Col>
  );
}
