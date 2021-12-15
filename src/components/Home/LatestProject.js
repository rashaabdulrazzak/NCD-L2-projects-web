import React ,{useEffect,useState} from 'react'
import {Container,Row,Col,Card,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

import Details from '../../Details';
import help from '../../img/help.jpg'
import { Project } from '../Project';
export default function LatestProject({projects1}) {
  // const [projects1, setProjects1] = useState([]);
  
  // useEffect(() => {   
  //   // every second after the component first mounts
  //   // update the list of projects by invoking the listOfProjects
  //   // method on the smart contract
  //   const id = setInterval(() => {      
  //     contract
  //       .listOfProjects()
  //       .then((projects) => {
  //         console.log('projects',projects)
  //         let size = 3 ;
  //         let newArr = projects.slice(0,size)
  //         console.log('newArr',newArr)
  //         setProjects1(newArr)});
  //   }, 1000); 
  //   return () => clearInterval(id);
  // }, [contract]);
 
  return (
    <Container className="padding-80">
        <Row className="my-5">
        <Col xs={12} className="d-flex justify-content-center secondary-color">
          <h2>Latest Projects</h2>
        </Col>
      </Row>
     
      <Row>
       
        {projects1.map((project) => (
           <Col>
         <Card>
         <Card.Img variant="top" src={help} />
         <Card.Body>
           <Card.Title>{project.name}</Card.Title>
           <Card.Text>
           {project.description}
           </Card.Text>
           <Card.Text>
            <h6> Need funds: <span>{project.funds}</span></h6>
           </Card.Text>
           <Link to={{pathname:`/projects/${project.id}` , project:{project} }}>Read more</Link>
         </Card.Body>
       </Card>
       </Col>))}
         
         
      </Row>
   
    </Container>
  )
}
