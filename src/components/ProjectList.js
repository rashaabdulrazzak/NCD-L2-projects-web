import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { Project } from "./Project";
import { useEffect, useState } from "react";
const { utils } = nearAPI; 

const gas = new BN("30000000000000");
const PER_PAGE_LIMIT = 3;

const ProjectList = ({contract, wallet}) => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {   
    // every second after the component first mounts
    // update the list of projects by invoking the listOfProjects
    // method on the smart contract
    const id = setInterval(() => {      
      contract
        .listOfProjects()
        .then((projects) => {
          console.log('projects',projects)
          setProjects(projects)});
    }, 1000); 
    return () => clearInterval(id);
  }, [page, contract]);

  // Donate with x funds 
 const donate =async(address,id,funds)=>{ 
  const transferMoney = wallet.account().functionCall({
    contractId: "dev-1637159318973-57576165741839",
    methodName: "donateForPoject",
    args:{"accountId":address, "id" : id, "funds": funds},    
    gas,
    attachedDeposit:utils.format.parseNearAmount(funds)
    }) 
  console.log(transferMoney);   
  };
  return (
    <section className="py-2 mt-5 mb-3"
    style={{       
      fontSize: "1rem",
      fontWeight: 1.5,
      lineHeight: 1.5,
      color: "#292b2c",
      backgroundColor: "#fff",
      padding: "0 2em"
    }}
    >
     <h5 classNmae="text-center">List Of Projects</h5>     
      {projects.map((project) => (
        <div key={project.id}>
          <Project contract={contract} project = {project} donate={donate}/>
        </div>
      ))}
       <div className="flex"  style={{
        padding: "0 2em"
      }}>
      Current Page: {page}
      </div>
      <button onClick={() => setPage((page) => page - 1)}>&lt;</button>
      {" "}
      <button onClick={() => setPage((page) => page + 1)}>&gt;</button>
    </section>
  );
}

export default ProjectList;