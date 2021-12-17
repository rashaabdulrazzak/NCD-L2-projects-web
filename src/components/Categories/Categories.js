import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProjectList1 from "../ProjectList/ProjectList1";
import { Col, Row } from "react-bootstrap";
export default function Categories({
  contract,
  donate,
  wallet,
  currentUser,
  signIn,
}) {
  const { catName } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // update the list of projects by invoking the listOfProjects
    // method on the smart contract

    const getProjectsbyCategories = () => {
      contract.listOfProjects().then((result) => {
        console.log("project", result);
        const catResult = result.filter((item) => item.category === catName);
        console.log("result", catResult);
        setProjects(catResult);
      });
    };
    getProjectsbyCategories();
  }, [contract, catName]);
  return (
    <div>
      <Row className="my-5">
        <Col xs={12} className="d-flex justify-content-center secondary-color">
          <h2>{catName}</h2>
        </Col>
      </Row>
      <ProjectList1
        projects={projects}
        contract={contract}
        wallet={wallet}
        donate={donate}
        signIn={signIn}
        currentUser={currentUser}
      />
    </div>
  );
}
