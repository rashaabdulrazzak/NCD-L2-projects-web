import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Card from "../Card/Card";
import "./ProjectList.css";

const PER_PAGE_LIMIT = 3;

const ProjectList = ({ contract, donate, currentUser, signIn }) => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [projectsCount, setProjectsCount] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      contract.getNumberOfProjects().then((result) => {
        console.log("result", result);
        setProjectsCount(result);
        let numOfPages = Math.ceil(projectsCount / PER_PAGE_LIMIT);
        setTotalPageCount(numOfPages);
      });
    }, 100);

    const id1 = setInterval(() => {
      const startIndex = page * PER_PAGE_LIMIT - PER_PAGE_LIMIT;
      const endIndex = startIndex + PER_PAGE_LIMIT;
      contract
        .getProjectsBySpecifcNumber({
          startIndex,
          endIndex,
        })
        .then((projects) => {
          if (projects.length < 2) {
            setLoading(true);
            setProjects(projects);
          } else {
            setLoading(false);
            setProjects(projects);
          }
        });
    }, 500);

    return () => {
      clearInterval(id);
      clearInterval(id1);
    };
  }, [page, contract, projectsCount]);

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
  }

  const getPaginationGroup = () => {
    let start = Math.floor((page - 1) / PER_PAGE_LIMIT) * PER_PAGE_LIMIT;
    return new Array(totalPageCount).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <Container
      className="py-2 mt-5 mb-3 font-link"
      style={{
        color: "#292b2c",
        backgroundColor: "#fff",
      }}
    >
      <Row className="my-5">
        <Col xs={12} className="d-flex justify-content-center secondary-color">
          <h2>Our Projects</h2>
        </Col>
      </Row>

      <Row>
        <div className="cards">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card
                key={project.id}
                contract={contract}
                project={project}
                donate={donate}
                currentUser={currentUser}
                signIn={signIn}
              />
            ))
          ) : (
            <section className="cta-detail">
              <Container className="container" data-aos="zoom-in">
                <div className="text-center">
                  <h3>No Project on this Category to display</h3>
                  <p> Why you do not you see another projects? </p>
                  <Button
                    className="cta-detail-btn"
                    onClick={() => window.location.replace("/allprojects")}
                  >
                    List all pojects
                  </Button>
                </div>
              </Container>
            </section>
          )}
        </div>
      </Row>

      <Row className="justify-content-center px-5 disp-grid">
        <Col>
          <div className="pagination">
            <button
              onClick={() =>
                setPage((page) => {
                  setPage(page - 1);
                })
              }
              className={`prev ${page === 1 ? "disabled" : ""}`}
            >
              &laquo; Prev
            </button>{" "}
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${page === item ? "active" : null}`}
              >
                <span>{item}</span>
              </button>
            ))}
            <button
              onClick={() =>
                setPage((page) => {
                  if (page >= totalPageCount) {
                    setPage(totalPageCount);
                  } else {
                    setPage(page + 1);
                  }
                })
              }
              className={`next ${page === totalPageCount ? "disabled" : ""}`}
            >
              Next &raquo;
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectList;
