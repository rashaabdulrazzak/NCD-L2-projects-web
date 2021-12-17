import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { Container, Row } from "react-bootstrap";
import "./ProjectList.css";
import Card from "../Card/Card";
const { utils } = nearAPI;

const gas = new BN("70000000000000");

const ProjectList1 = ({ contract, wallet, projects, currentUser, signIn }) => {
  // Donate with x funds
  const donate = async (address, id, funds) => {
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
    <Container className="mt-5 mb-3">
      <Row>
        <div className="cards">
          {projects.map((project) => (
            <Card
              key={project.id}
              contract={contract}
              project={project}
              donate={donate}
              currentUser={currentUser}
              signIn={signIn}
            />
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default ProjectList1;
