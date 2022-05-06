import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import apiAccess from '../api/APIAccess';
import EditPlaceModal from './EditPlaceModal';


const Place = (props) => {
    const [place, setPlace] = useState();
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [reviewPhoto, setReviewPhoto] = useState('');
    const [rating, setRating] = useState(1);
    const [showEditPlace, setShowEditPlace] = useState(false);
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

    const showEditPlaceModal = () => {
        setShowEditPlace(true);
    }

    const handleEditPlace = (name, latitude, longitude, description, category_id) => {

        apiAccess.updatePlace(id, name, latitude, longitude, description, category_id)
            .then(x => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong');
            })
    }

    const addReview = () => {
        apiAccess.addReview(reviewText, rating, reviewPhoto, id)
            .then(x => {
                if (x.done) {
                    apiAccess.addPhotoToReview(reviewPhoto, x.id)
                        .then(y => {
                            console.log('review photo added');
                            window.location.reload();
                        })
                } else {
                    alert(x.message);
                }
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong');
            })
    }

    useEffect(() => {
        apiAccess.getPlace(id)
            .then(x => {
                console.log(x);
                setPlace(x);
                apiAccess.getReviews(id)
                    .then(r => {
                        setReviews(r.result);
                        console.log(r.result);
                    })
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <Container>
            {
                showEditPlace ?
                <EditPlaceModal show={showEditPlace} hide={() => setShowEditPlace(false)} place={place} onConfirm={handleEditPlace}/>
                :
                <></>
            }
            {
                place ?
                    <>
                        <Card className="text-center" style={{ "width": "25rem" }}>
                            <Card.Header as="h5" ></Card.Header>
                            <Card.Img variant="top" src={place.file} />
                            <Card.Body>
                                <Card.Title>{place.name}</Card.Title>
                                <Card.Subtitle>{place.description}</Card.Subtitle>
                                <Card.Text>
                                    Located at {place.latitude}, {place.longitude}
                                </Card.Text>
                                <Card.Text>
                                    Category: <strong>{place.category_name}</strong>
                                </Card.Text>
                            </Card.Body>
                            <ListGroup>
                                <ListGroup.Item></ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <Button variant="warning" onClick={showEditPlaceModal}>Edit</Button>
                                <Button variant="danger" onClick={deletePlace}>Delete</Button>
                            </Card.Footer>
                        </Card>

                        {
                            reviews.length > 0 ?
                                <>
                                    <h5>Reviews</h5>
                                    <ul>
                                        {reviews.map((x, i) => (
                                            // <li key={i}>{x.email} says: {x.name} {x.text} {x.rating}/10</li>
                                            <Card className="text-center" style={{ "width": "15rem" }}>
                                                <Card.Img variant="top" src={x.file} />
                                                <Card.Body>
                                                    <Card.Title as="h6">{x.email} says:</Card.Title>
                                                    <Card.Subtitle></Card.Subtitle>
                                               
                                                    <Card.Text>{x.text}</Card.Text>
                                                    <Card.Text>Rating: <strong>{x.rating}/10</strong></Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                </Card.Footer>
                                            </Card>
                                        ))}
                                    </ul>
                                </>
                                :
                                <p>No reviews for this place</p>
                        }
                        <hr />
                        <Form.Group controlId="formGridReview">
                            <Form.Label>Add a review</Form.Label>
                            <Form.Control placeholder="Text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formGridPhoto">
                            <Form.Label>Photo URL</Form.Label>
                            <Form.Control type="text" value={reviewPhoto} onChange={(e) => setReviewPhoto(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formGridRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" min="1" max="10" value={rating} onChange={(e) => setRating(e.target.value)} />
                        </Form.Group>
                        <Button variant="success" onClick={addReview}>Post</Button>
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