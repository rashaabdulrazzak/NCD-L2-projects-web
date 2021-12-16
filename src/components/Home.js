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
import CallToAction from './Home/CallToAction'
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
    <>   
    <Container>     
      <MainSection/>
      <LatestResults contract={contract}/>
      <HowItWorks/>
      <CategorIesProject />       
      <LatestProject projects1={projects1}/>       
    </Container>  
    <CallToAction/>
   </>
  )
}
export default Home 