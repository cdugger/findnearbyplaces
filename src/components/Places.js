import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import apiAccess from "../api/APIAccess";

const Places = (props) => {
    const [places, getPlaces] = useState();

    useEffect(() => {
        
    }, [])

    return (
        <Container>
             <Row xs={1} md={3} className="g-4 text-center">
                {places.map((p, i) => (
                    <Col key={i}>
                        <Card className="h-100" onClick={() => ''}>
                            <Card.Img variant="top" src={''} />
                            <Card.Body>
                                <Card.Title>{p.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Places;