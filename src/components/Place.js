import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import apiAccess from '../api/APIAccess';


const Place = (props) => {
    const [place, setPlace] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const deletePlace = () => {
        if (window.confirm("Are you sure you want to delete this place?")) {
            apiAccess.deletePlace(id)
                .then(x => {
                    if (x.done) {
                        navigate('/');
                    } else {
                        alert(x.message);
                    }

                })
                .catch(err => {
                    alert('Something went wrong');
                })
        }
    }

    const editPlace = () => {

    }

    useEffect(() => {
        apiAccess.getPlace(id)
            .then(x => {
                console.log(x);
                setPlace(x);
            })
    }, [])

    return (
        <Container>
            {
                place ?
                    <>
                        <Card className="text-center" style={{ "width": "40rem" }}>
                            <Card.Header as="h5" ></Card.Header>
                            <Card.Img variant="top" src={''} />
                            <Card.Body>
                                <Card.Title>{place.name}</Card.Title>
                                <Card.Subtitle>{place.description}</Card.Subtitle>
                                <Card.Text>
                                    Located at {place.latitude} {place.longitude}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup>
                                <ListGroup.Item></ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Button variant="warning" onClick={editPlace}>Edit</Button>
                        <Button variant="danger" onClick={deletePlace}>Delete</Button>
                    </>
                    :
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }

        </Container>
    );

}

export default Place;