import React,{useEffect,useState} from 'react'
import { Row,Button ,Container, Col} from 'react-bootstrap';

import CreateProject from './CreateProject';
import ProjectList from './ProjectList/ProjectList';
import Balance from "./Balance";
import LatestResults from './Home/LatestResults'
import MainSection from './Home/MainSection'
import HowItWorks from './Home/HowItWorks'
import LatestProject from './Home/LatestProject'
import CategorIesProject from './Home/CategorIesProject'
 const Home = ({ contract, currentUser, nearConfig, wallet }) => {
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
  return (
    <Container>     
    <MainSection/>
    <LatestResults contract={contract}/>
    <HowItWorks/>
    <LatestProject projects1={projects1}/>
    <CategorIesProject />
    { currentUser
      ? <Container>
          <Row>
            <h2>
              Hello: {currentUser.accountId} :{ currentUser ? <Balance amount={currentUser.balance} /> : null}
              {" "}
              <Button variant="secondary" onClick={signOut}>Log out</Button>
            </h2>   
          </Row>                       
          <Row>
            <Col lg="4">
              <CreateProject contract={contract} />
            </Col>
            <Col lg="8">
              <ProjectList contract={contract} wallet={wallet} />
            </Col>
          </Row>              
        </Container>
      : 
      <Row>
        Sign In To Use The App: 
        {" "}
        <button onClick={signIn}>Log in</button>
      </Row>
    } 
  </Container>
  )
}
export default Home 