import React,{useState} from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { Link  } from 'react-router-dom'
import alms from '../../img/alms.png'
import healthcare from '../../img/healthcare.png'
import environmentalism from '../../img/environmentalism.png'
import helping from '../../img/helping.png'
import globaleducation from '../../img/globaleducation.png'
import personal from '../../img/personal.png'

export default function CategorIesProject() {
  const [categories, setCategories] = useState(['Personal','Charity','Environment','Learning','Health','Uncategorized']);
  const [images, setImages] = useState([personal,alms,environmentalism,globaleducation,healthcare,helping]);
  return (
    <Container>
       <Row className="my-5">
        <Col xs={12} className="d-flex justify-content-center secondary-color">
          <h2>Projects Categories</h2>
        </Col>
      </Row>
   
        <Row className="icon-boxes">
      {
        categories.map((cat,index)=>{
          return <Col md={6} lg={4} className="flex align-items-stretch mb-5" data-aos="zoom-in" data-aos-delay="200">
        <Link to={{pathname:`/project-categories/${cat}`}} className="links">
          <div className="icon-box">
            <div className="icon"><img src={images[index]} alt={cat} width='80'/></div>
            <h4 className="title">{cat}</h4>
            <p className="description">Give this a look   </p>
          </div>
          </Link>
        </Col>
  
        })
      }
     
      </Row>
       
     
  </Container>
  )
}
