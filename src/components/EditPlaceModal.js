import { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import apiAccess from '../api/APIAccess';


const EditPlaceModal = (props) => {
    const [name, setName] = useState(props.place.name);
    const [longitude, setLongitude] = useState(props.place.longitude);
    const [latitude, setLatitude] = useState(props.place.latitude);
    const [description, setDescription] = useState(props.place.description);
    const [category, setCategory] = useState(props.place);
    const [categories, setCategories] = useState([]);

    const handleConfirm = () => {
        props.onConfirm(name, longitude, latitude, description, category);
        props.hide();
    }

    useEffect(() => {
        apiAccess.getCategories()
            .then(x => {
                setCategories(x.result);
                setCategory(x.result[0].id);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit place</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Editing <strong>{props.place.name}</strong></p>
                <FloatingLabel controlId="floatingTextarea" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea" label="Latitude" className="mb-3">
                    <Form.Control type="number" placeholder="" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea" label="Longitude" className="mb-3">
                    <Form.Control type="number" placeholder="" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                    <Form.Control type="text" placeholder="" value={description} onChange={(e) => setDescription(e.target.value)} />
                </FloatingLabel>
                <Form.Group controlId="formGridCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select defaultValue="" onChange={(e) => { setCategory(e.target.value) }}>
                        {
                            categories.map((x, i) => (
                                <option key={i} value={x.id}>{x.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default EditPlaceModal;