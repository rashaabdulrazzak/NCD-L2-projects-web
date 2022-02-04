import "regenerator-runtime/runtime";
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav, Container, Navbar, Button } from "react-bootstrap";

import Home from "./components/Home";
import CreateProject from "./components/CreateProject";
import ProjectList from "./components/ProjectList/ProjectList";
import Balance from "./components/Balance";
import Categories from "./components/Categories/Categories";
import Details from "./components/Details/Details";
import Footer from "./components/Footer/Footer";
import logo from "./img/help.jpg";
import "./App.css";
import * as nearAPI from "near-api-js";
import BN from "bn.js";

const { utils } = nearAPI;

const gas = new BN("70000000000000");

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      "dev-1639044592936-27936420176945"
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  // Donate with x funds
  const donateforProject = async (address, id, funds) => {
    alert(id);
    const transferMoney = wallet.account().functionCall({
      contractId: "dev-1639044592936-27936420176945",
      methodName: "donateForPoject",
      args: { accountId: address, id: id, funds: funds },
      gas,
      attachedDeposit: utils.format.parseNearAmount(funds),
    });
    console.log(transferMoney);
  };
  return (
    <>
      <Router>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="font-link"
        >
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link href="/newproject">Create a Project</Nav.Link>
                <Nav.Link href="/allprojects">Fund a Project</Nav.Link>
                {currentUser ? (
                  <Nav.Link
                    onClick={
                      currentUser.accountId === "" ? { signIn } : { signOut }
                    }
                  >
                    {currentUser ? (
                      <p style={{ marginTop: "-5px" }}>
                        {" "}
                        Hello: {currentUser.accountId} :
                        {currentUser ? (
                          <Balance amount={currentUser.balance} />
                        ) : null}{" "}
                        <Button variant="secondary" onClick={signOut}>
                          Log out
                        </Button>
                      </p>
                    ) : (
                      <p>Log in</p>
                    )}
                  </Nav.Link>
                ) : (
                  <Button onClick={signIn}>Log in</Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                contract={contract}
                currentUser={currentUser}
                nearConfig={nearConfig}
                wallet={wallet}
              />
            }
          />
          <Route
            exact
            path="/allprojects"
            element={
              <ProjectList
                contract={contract}
                donate={donateforProject}
                signIn={signIn}
                currentUser={currentUser}
              />
            }
          />
          <Route
            exact
            path="/projects/:projectId"
            element={
              <Details
                contract={contract}
                currentUser={currentUser}
                donate={donateforProject}
                signIn={signIn}
              />
            }
          />
          <Route
            exact
            path="/project-categories/:catName"
            element={
              <Categories
                contract={contract}
                donate={donateforProject}
                wallet={wallet}
                currentUser={currentUser}
                signIn={signIn}
              />
            }
          />

          <Route
            exact
            path="/newproject"
            element={
              <CreateProject
                contract={contract}
                currentUser={currentUser}
                nearConfig={nearConfig}
                wallet={wallet}
                signIn={signIn}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    listOfProjects: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    donateForPoject: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    getNumberOfProjects: PropTypes.func.isRequired,
    getFundedProjectsNumber: PropTypes.func.isRequired,
    getProjectsBySpecifcNumber: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
