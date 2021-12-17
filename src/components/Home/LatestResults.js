import React, { useState, useEffect } from "react";
import "./Home.css";
import { Col, Row } from "react-bootstrap";
import solidarity from "../../img/solidarity.png";
import charity1 from "../../img/charity1.png";

function LatestResults({ contract }) {
  const [numOfProjects, setnumOfProjects] = useState(0);
  const [numOfFundedProjects, setnumOfFundedProjects] = useState(0);
  useEffect(() => {
    //get the total number of added projects by invoking the getNumberOfProjects
    // method on the smart contract
    const getNumberOfProjects = async () => {
      await contract.getNumberOfProjects().then((result) => {
        console.log("result", result);
        setnumOfProjects(result);
      });
    };
    const getNumberOfFundedProjects = async () => {
      await contract.getFundedProjectsNumber().then((result) => {
        console.log("result", result);
        setnumOfFundedProjects(result);
      });
    };
    getNumberOfProjects();
    getNumberOfFundedProjects();
  }, [contract]);
  return (
    <Row className="d-flex justify-content-center px-5 ">
      <Col className="contact-widget justify-content-center contact-content ">
        <img src={solidarity} alt="monitor" width="50px" />
        <div>
          <h6 className="widget-title">Project Added</h6>
          <p className="widget-content">{numOfProjects}</p>
        </div>
      </Col>
      <Col className="contact-widget justify-content-center contact-content">
        <img src={charity1} alt="book" width="50px" />
        <div>
          <h6 className="widget-title">Funded Projects</h6>
          <p className="widget-content">{numOfFundedProjects}</p>
        </div>
      </Col>
    </Row>
  );
}

export default LatestResults;
