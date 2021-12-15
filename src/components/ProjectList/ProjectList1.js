import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { Project } from "../Project";
import { useEffect, useState } from "react";
import { Container,Row , Col} from "react-bootstrap";
import './ProjectList.css'
import Card from "../Card/Card";
const { utils } = nearAPI; 


const gas = new BN("30000000000000");
const PER_PAGE_LIMIT = 3;

const ProjectList1 = ({contract, wallet,projects}) => {
 

  // Donate with x funds 
 const donate =async(address,id,funds)=>{ 
  const transferMoney = wallet.account().functionCall({
    contractId: "dev-1639044592936-27936420176945",
    methodName: "donateForPoject",
    args:{"accountId":address, "id" : id, "funds": funds},    
    gas,
    attachedDeposit:utils.format.parseNearAmount(funds)
    }) 
  console.log(transferMoney);   
  }
  return (
    <Container className="py-2 mt-5 mb-3"
    style={{       
      fontSize: "1rem",
      fontWeight: 1.5,
      lineHeight: 1.5,
      color: "#292b2c",
      backgroundColor: "#fff",
      padding: "0 2em"
    }}
    >
     
    
     
      <Row>
        <div className="cards">
      {projects.map((project) => (
        
          <Card key={project.id} contract={contract} project = {project} donate={donate}/>
        
      ))}
      </div>
       </Row>
     
  
    </Container>
  );
}

export default ProjectList1;