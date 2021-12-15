import React,{useState} from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { Link  } from 'react-router-dom'

export default function CategorIesProject() {
  const [categories, setCategories] = useState(['Personal','Charity','Environment','Learning','Health','Uncategorized']);
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
          return <Col md={6} lg={4} className="d-flex align-items-stretch mb-5" data-aos="zoom-in" data-aos-delay="200">
        <Link to={{pathname:`/project-categories/${cat}`}} className="links">
          <div className="icon-box">
            <div className="icon"><i className="ri-stack-line"></i></div>
            <h4 className="title"><a href="">{cat}</a></h4>
            <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
          </div>
          </Link>
        </Col>
  
        })
      }
     
      </Row>
       
     
  </Container>
  )
}
