import React from 'react'
import './Card.css'
import help from '../../img/help.jpg'
import {Col,Button,Row} from 'react-bootstrap'
export default function Card(props) {
  const {name,description,funds,received,residual} = props.project
  return (
    
    <Col md={3} className="card">
        <img src={help} alt="" />
        <div className="card-body">
          <h2>{name}</h2>
          <p>
            {description}
          </p>
          <p className="funds">Needed Funds: <span style={{ fontWeight: 400 }}>{funds} </span></p>
          <p className="funds">
            Received Fund:
          <span style={{ fontWeight: 400 }}> {received}</span>
          </p>
          <p className="funds">
           Residual:
          <span style={{ fontWeight: 400 }}> {residual}</span>          
        </p>
         <Row>
           <Col md={6}>
            {
             props.project.residual != 0 ? <Button variant="outline-warning" onClick={() => props.donate(props.project.address,props.project.id,"5")}> Donate with 5 Near</Button>: <Button as={Col} variant="outline-warning" className="p-2 mx-2" disabled onClick={() => props.donate(props.project.address,props.project.id,"5")
               }> Donate with 5 Near</Button>
             }
           </Col>
           <Col  md={6}>
           {
          props.project.residual != 0 ? <Button variant="secondary" onClick={() => props.donate(props.project.address,props.project.id,"10")}> Donate with 10 Near</Button>: <Button disabled as={Col} variant="secondary" className="p-2 mx-2" onClick={() => props.donate(props.project.address,props.project.id,"10")}> Donate with 10 Near</Button>
        }
           </Col>
         </Row>
        
        
        </div>
        <Row>
        {name} 
        {description}
        {funds}
        {props.project.id}
        </Row>
      </Col>

  )
}
