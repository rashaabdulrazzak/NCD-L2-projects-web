import { Button,Col, Row } from 'react-bootstrap';
import help from '../img/help.jpg'
import { Link } from 'react-router-dom';
export function Project(props) {  
  return (
    <>
      <Row key = {props.project.id}
        style={{
          textAlign: "center",
          maxWidth: "950px",
          margin: "0 auto",
          border: "1px solid #e6e6e6",
          padding: "40px 25px",
          marginTop: "60px"
        }}
      >
        <img
          src={help}
          alt={props.project.name}
          style={{
            margin: "-90px auto 30px",
            width: "200px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "0"
          }}
        />
        <div>
          <p
            style={{           
              fontWeight: 600,
              fontSize: "1rem"
            }}
          >
          Project Name:
            <span style={{ fontWeight: 400 }}> {props.project.name}</span>
          </p>
          <p
              style={{
                fontWeight: 600,
                fontSize: "1rem"
              }}
            >
          Project Description: <span style={{ fontWeight: 400 }}>  {props.project.description}</span>
              
          </p>
        </div>
        <p
          style={{
           
            fontWeight: 600,
            fontSize: "1rem"
          }}
        >
        Needed Fund:
          <span style={{ fontWeight: 400 }}> {props.project.funds}</span>
        </p>
        <p
          style={{
           
            fontWeight: 600,
            fontSize: "1rem"
          }}
        >
        Received Fund:
          <span style={{ fontWeight: 400 }}> {props.project.received}</span>
        </p>
        <p
          style={{
           
            fontWeight: 600,
            fontSize: "1rem"
          }}
        >
        Residual Fund:
          <span style={{ fontWeight: 400 }}> {props.project.residual}</span>
        </p>
       
        {
          props.project.residual != 0 ? <Button className="p-2 mx-2" as={Col} variant="outline-warning" onClick={() => props.donate(props.project.address,props.project.id,"5")}> Donate with 5 Near</Button>: <Button as={Col} variant="outline-warning" className="p-2 mx-2" disabled onClick={() => props.donate(props.project.address,props.project.id,"5")
          }> Donate with 5 Near</Button>
        }
        {
          props.project.residual != 0 ? <Button  className="p-2 mx-2" as={Col} variant="secondary" onClick={() => props.donate(props.project.address,props.project.id,"10")}> Donate with 10 Near</Button>: <Button disabled as={Col} variant="secondary" className="p-2 mx-2" onClick={() => props.donate(props.project.address,props.project.id,"10")}> Donate with 10 Near</Button>
        }
       
      </Row>
      
    </>
  );
}