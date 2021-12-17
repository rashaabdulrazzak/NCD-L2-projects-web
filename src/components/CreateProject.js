// src/components/CreateProject.js
import { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Toast,
  Container,
} from "react-bootstrap";
import { connect, keyStores } from "near-api-js";

const CreateProject = ({
  contract,
  currentUser,
  nearConfig,
  wallet,
  signIn,
}) => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [funds, setFunds] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [loading, setLoading] = useState(false);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const toggleShowB = () => setShowB(!showB);
  const toggleShowA = () => setShowA(!showA);
  const categories = [
    "Personal",
    "Charity",
    "Environment",
    "Learning",
    "Health",
    "Uncategorized",
  ];
  const config = {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.te{stnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const checkAccount = async (address) => {
    try {
      const near = await connect(config);
      const account = await near.account(address);
      const response = await account.state();
      console.log("response", response);
      return response.amount;
    } catch (e) {
      console.log("response", e);
      return "Not Found";
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await checkAccount(address);
    if (result != "Not Found") {
      // invoke the smart contract's create method
      console.log("result", result);
      const project = await contract.create({
        address,
        name,
        funds,
        description,
        category,
      });
      setAddress("");
      setName("");
      setFunds("");
      setDescription("");
      setCategory("Uncategorized");
      setLoading(false);
      console.log("project", project);
      if (project) {
        setShowA(true);
        console.log("project", project);
        window.location.replace("/allprojects");
      }
    } else {
      setShowB(true);
      console.log("error", "no account found");
    }
  };
  return (
    <>
      {currentUser ? (
        <Container>
          <Row className="my-5">
            <Col
              md={{ span: 8, offset: 2 }}
              className="d-flex justify-content-center secondary-color"
            >
              <h2> Submit a project to get funds</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              {showA == true ? (
                <Toast
                  show={showA}
                  onClose={toggleShowA}
                  position="top-end"
                  bg="success"
                >
                  <Toast.Header>
                    <strong className="me-auto">Congrat</strong>
                  </Toast.Header>
                  <Toast.Body>
                    Your Project has been successfully created
                  </Toast.Body>
                </Toast>
              ) : (
                <Toast
                  show={showB}
                  onClose={toggleShowB}
                  position="top-end"
                  bg="danger"
                >
                  <Toast.Header>
                    <strong className="me-auto">Failed</strong>
                  </Toast.Header>
                  <Toast.Body>
                    Your Project Address should be an existing Address on the
                    testnet
                  </Toast.Body>
                </Toast>
              )}
              <Form onSubmit={handleSubmit} className="my-3 pt-3">
                <Form.Control
                  type="text"
                  placeholder="Type the address of the prject you need to be funded 'test.testnet'"
                  required
                  minLength="2"
                  value={address}
                  onChange={({ target }) => setAddress(target.value)}
                />
                <br />
                <Form.Control
                  type="text"
                  placeholder="Type your project name"
                  required
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
                <br />
                <Form.Control
                  type="number"
                  placeholder="Type the needed funds"
                  required
                  min="1"
                  value={funds}
                  onChange={({ target }) => setFunds(target.value)}
                />
                <br />
                <FloatingLabel
                  controlId="floatingSelect"
                  label="Select a Category of your project"
                >
                  <Form.Select
                    defaultValue={category}
                    onChange={({ target }) => {
                      setCategory(target.value);
                    }}
                    label="Select a Category of your project"
                  >
                    {categories.map((category, id) => {
                      return (
                        <option key={id} value={category}>
                          {category}
                        </option>
                      );
                    })}
                  </Form.Select>
                </FloatingLabel>
                <br />
                <br />
                <Form.Control
                  type="text"
                  placeholder="Type a short description about your project"
                  required
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                />
                <br />
                <Button variant="outline-info" disabled={loading} type="submit">
                  Create Project
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="container" data-aos="zoom-in">
          <div className="text-center mx-auto p-5 mt-5">
            <h2 className="my-3">To Create a Project </h2>
            <h6 className="my-3">Please Sign in First </h6>
            <Button onClick={signIn}>Sign In</Button>
          </div>
        </Container>
      )}
    </>
  );
};

export default CreateProject;
