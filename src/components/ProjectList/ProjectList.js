import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { Project } from "../Project";
import { useEffect, useState } from "react";
import { Container,Row , Col} from "react-bootstrap";
import './ProjectList.css'
import Card from "../Card/Card";
const { utils } = nearAPI; 


const gas = new BN("30000000000000");
const PER_PAGE_LIMIT = 2;

const ProjectList = ({contract, wallet}) => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [projectsCount, setProjectsCount] = useState(0)

  useEffect(() => {   
    
     let offset 
     const id = setInterval(() => {
      contract
      .getNumberOfProjects()
      .then((result) => {
        console.log('result',result)
        setProjectsCount(result)
        let numOfPages = projectsCount / PER_PAGE_LIMIT 
        setTotalPageCount(numOfPages)
    })
   }, 100);
     if(page < 1) {
       setPage(1);
       offset = projectsCount - PER_PAGE_LIMIT;
      
     } else {
       offset = projectsCount - (page) * PER_PAGE_LIMIT;       
       
     }
        
    const id1 = setInterval(() => {      
      if(page <= 1){
        contract
        .getProjectsBySpecifcNumber({ startIndex:  0 , endIndex : PER_PAGE_LIMIT})
        .then((projects) => {
          if (projects.length < PER_PAGE_LIMIT) {
            setLoading(true)
            setProjects(projects);
          } else {
            setLoading(false)
            setProjects(projects);
          }})
      }else{
        contract
        .getProjectsBySpecifcNumber({ startIndex: offset < 0 ? 0 : offset, endIndex: offset + PER_PAGE_LIMIT})
        .then((projects) => {
          if (projects.length < 2) {
            setLoading(true)
            setProjects(projects);
          } else {
            setLoading(false)
            setProjects(projects);
          }})
      }
   
          
    }, 500); 
    
    return () => {
      clearInterval(id)
      clearInterval(id1)
    };

  }, [page, contract]);

  // Donate with x funds 
 const donate =async(address,id,funds)=>{ 
   alert(id,address)
  const transferMoney = wallet.account().functionCall({
    contractId: "dev-1639044592936-27936420176945",
    methodName: "donateForPoject",
    args:{"accountId":address, "id" : id, "funds": funds},    
    gas,
    attachedDeposit:utils.format.parseNearAmount(funds)
    }) 
  console.log(transferMoney);   
  };
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
     
     <Row className="my-5">
        <Col xs={12} className="d-flex justify-content-center secondary-color">
          <h2>Our Projects</h2>
        </Col>
      </Row>
     
      <Row>
        <div className="cards">
      {projects.map((project) => (
        
          <Card key={project.id} contract={contract} project = {project} donate={donate}/>
        
      ))}
      </div>
       </Row>    
    
      <Row className="justify-content-center px-5 disp-grid"> 
       <Col>
       <div  style={{
        padding: "2em 3em"
      }}>
      Current Page: {page}
      </div>
      <button onClick={() => setPage((page) => {setPage(page-1)})}>&lt;</button>
      {" "}
      <button onClick={() => setPage((page) => {
        if(page >= totalPageCount){setPage(totalPageCount) } else{setPage(page+1)} })}>&gt;</button>
      </Col>
      </Row> 
    </Container>
  );
}

export default ProjectList;