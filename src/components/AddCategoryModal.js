import { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import apiAccess from '../api/APIAccess';


const AddCategoryModal = (props) => {
    const [name, setName] = useState('');


    const handleConfirm = () => {
        props.onConfirm(name);
        props.hide();
    }

    useEffect(() => {

    }, []);

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId="floatingTextarea" label="Category Name" className="mb-3">
                    <Form.Control type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>
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

export default AddCategoryModal;