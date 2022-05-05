import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import apiAccess from '../api/APIAccess';

const AddPlace = (props) => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.addPlace(name, latitude, longitude, category, description)
        .catch(err => {
            
        })
    }

    useEffect(() => {
        apiAccess.getCategories()
            .then(x => {
                setCategories(x);
                setCategory(x[0].id);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Form>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGridName" onSubmit={onSubmitHandler}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Place Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select defaultValue="" onChange={(e) => {console.log(e.target.value)}}>
                        {
                            categories.map((x, i) => (
                                <option key={i} value={x.id}>{x.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridLatitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLatitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </Form.Group>
            </Row>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Leave a description here"
                    style={{ height: '100px' }}
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add place
            </Button>


        </Form>
    )
}

export default AddPlace;