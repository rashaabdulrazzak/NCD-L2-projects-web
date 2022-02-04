import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import help from "../../img/help.jpg";

export default function LatestProject({ projects1 }) {
  return (
    <Container className="padding-80 font-link">
      <Row className="my-5">
        <Col xs={12} className="d-flex justify-content-center secondary-color">
          <h2>Latest Projects</h2>
        </Col>
      </Row>
      <Row>
        {projects1.map((project) => (
          <Col>
            <Link
              to={{ pathname: `/projects/${project.id}` }}
              className="links"
            >
              <Card>
                <Card.Img variant="top" src={help} />
                <Card.Body>
                  <Card.Title>{project.name}</Card.Title>
                  <Card.Text>
                    {" "}
                    {`${project.description.substring(0, 200)}...`}
                  </Card.Text>
                  <Card.Text>
                    <h6>
                      {" "}
                      Need funds: <span>{project.funds}</span>
                    </h6>
                  </Card.Text>
                  Read more
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
