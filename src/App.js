import 'regenerator-runtime/runtime';
import React ,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Routes  
} from 'react-router-dom'; 
import Home from './components/Home'
import { Nav ,Container, Navbar,Button} from 'react-bootstrap';
import logo from './img/help.jpg'
import CreateProject from './components/CreateProject';
import ProjectList from './components/ProjectList/ProjectList';
import Balance from "./components/Balance";
import Details from './Details';

import * as nearAPI from "near-api-js";
import BN from "bn.js";
import Categories from './components/Categories/Categories';
const { utils } = nearAPI; 


const gas = new BN("30000000000000");

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [projects1, setProjects1] = useState([]);
  
  useEffect(() => {   
    // every second after the component first mounts
    // update the list of projects by invoking the listOfProjects
    // method on the smart contract
    const id = setInterval(() => {      
      contract
        .listOfProjects()
        .then((projects) => {
          console.log('projects',projects)
          let size = 3 ;
          let newArr = projects.slice(0,size)
          console.log('newArr',newArr)
          setProjects1(newArr)});
    }, 1000); 
    return () => clearInterval(id);
  }, [contract]);
  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'dev-1639044592936-27936420176945'
    );
  };
  
  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
    // Donate with x funds 
 const donateforProject =async(address,id,funds)=>{ 
   alert(id)
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
    <>
   
    <Router>  
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/"><img src={logo} alt="logo" style={{'width':'50px','height':'50px'}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          
          </Nav>
          <Nav>
            <Nav.Link href='/newproject'>Create a Project</Nav.Link>
            <Nav.Link href='/allprojects'>Fund a Project</Nav.Link>
            {
              currentUser? 
              <Nav.Link onClick={currentUser.accountId ===''? {signIn}:{signOut}}>
              { currentUser ?<p> Hello: {currentUser.accountId} :{ currentUser ? <Balance amount={currentUser.balance} /> : null} <Button variant="secondary" onClick={signOut}>Log out</Button></p> 
                  : <p>Log in</p>
       
               } 
              </Nav.Link>:   <Button onClick={signIn}>Log in</Button>
            }
           
            
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>     
      <Routes>
          <Route exact path="/"  element={<Home contract={contract}
                                          currentUser={currentUser}
                                          nearConfig={nearConfig}
                                          wallet={wallet} />} />          
          <Route exact path="/allprojects"  element={<ProjectList  contract={contract}                                          
                                          wallet={wallet} />} />          
          <Route exact path="/projects/:projectId"  element={<Details contract={contract} donate={donateforProject} test = "test" />}/>
          <Route exact path="/project-categories/:catName"  element={<Categories contract={contract} donate={donateforProject} wallet={wallet}  />}/>

          <Route exact path="/newproject"  element={<CreateProject contract={contract}
                                          currentUser={currentUser}
                                          nearConfig={nearConfig}
                                          wallet={wallet} />} />          
                                                  
      </Routes>      
    </Router>   
    </>    
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    listOfProjects: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,      
    donateForPoject:PropTypes.func.isRequired,     
    getProject:PropTypes.func.isRequired,
    getNumberOfProjects:PropTypes.func.isRequired,
    getFundedProjectsNumber:PropTypes.func.isRequired,
    getProjectsBySpecifcNumber:PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
