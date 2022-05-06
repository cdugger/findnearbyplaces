import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiAccess from '../api/APIAccess';


const Home = () => {
    const [places, setPlaces] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({});
    const navigate = useNavigate();

    const getPlace = (placeName) => {
        navigate('/place/' + placeName);
    }

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

    useEffect(() => {
        getLocation();
        // apiAccess.getPlaces()
        // .then(x => {
        //     setPlaces(x);
        // })
        // .catch(e => {
        //     console.log(e);
        //     alert('Something went wrong.')
        // })
    }, []);

    return (
        <Container>
            <Button variant="primary" type="submit">
                Find Places Near Me
            </Button>
        </Container>
    );
}

export default Home;