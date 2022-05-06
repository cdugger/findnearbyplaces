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
        apiAccess.search(searchTerm, radius, currentPosition.latitude, currentPosition.longitude, null)
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
                <Form.Label>Search Radius</Form.Label>
                <Form.Control type="number" min="0" placeholder="Radius" value={radius} onChange={(e) => setRadius(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridMax">
                <Form.Label>Number of results to show</Form.Label>
                <Form.Control type="number" min="1" placeholder="10" value={maxResults} onChange={(e) => setMaxResults(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleSearch}>
                Find Places Near Me
            </Button>


            {places.length > 0 ? 
            places.map((x, i) => (
                <p key={i}>{x.name}</p>
            ))
            :
            <p>No places found</p>
            }


        </Container>
    );
}

export default Home;