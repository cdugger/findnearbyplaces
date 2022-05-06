import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiAccess from '../api/APIAccess';


const Home = () => {
    const [places, setPlaces] = useState([]);
    const [radius, setRadius] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [maxResults, setMaxResults] = useState(10);
    const [currentPosition, setCurrentPosition] = useState({});
    const navigate = useNavigate();

    const handleSearch = () => {
        apiAccess.search(searchTerm, radius, currentPosition.latitude, currentPosition.longitude, maxResults)
            .then(x => {
                if (x.done) {
                    setPlaces(x.result);
                }
            }).catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        const showPosition = (position) => {
            setCurrentPosition(position.coords);
            console.log(`<br>Current location:<br>Latitude:  ${position.coords.latitude} <br>Longitude:  ${position.coords.longitude}`);
        }
        getLocation();
    }, []);

    return (
        <Container>
            <Form.Group controlId="formGridSearchTerm">
                <Form.Label>Search Term</Form.Label>
                <Form.Control placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridPhoto">
                <Form.Label>Search Radius (0 ignores radius)</Form.Label>
                <Form.Control type="number" min="0" value={radius} onChange={(e) => setRadius(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridMax">
                <Form.Label>Number of results to show</Form.Label>
                <Form.Control type="number" min="1" placeholder="10" value={maxResults} onChange={(e) => setMaxResults(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleSearch}>
                Find Places Near Me
            </Button>


            {places.length > 0 ?
                <>
                    <h4>{places.length} places found</h4>
                    <ul>
                        {places.map((x, i) => (
                            // <li key={i}><a href={`/#/place/${x.id}`}>{x.name}</a></li>
                            <Card key={i} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={x.thumbnail} />
                                <Card.Body>
                                    <Card.Title>{x.name}</Card.Title>
                                    <Card.Subtitle>Category: {x.category}</Card.Subtitle>
                                    <Card.Text>
                                        Description: {x.description}
                                    </Card.Text>
                                    <Card.Text>
                                        {x.distance ? 
                                        x.distance.toFixed(2) + " units away from you"
                                        : 
                                        <></>
                                        }
                                    </Card.Text>
                                    <Button variant="success" onClick={() => navigate(`place/${x.id}`)}>View Page</Button>
                                </Card.Body>
                            </Card>
                        ))
                        }
                    </ul>
                </>
                :
                <p>No places found</p>
            }


        </Container>
    );
}

export default Home;