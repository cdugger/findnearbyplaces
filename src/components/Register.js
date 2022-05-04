import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiAccess from '../api/APIAccess';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    let onNameChange = (e) => {
        setName(e.target.value);
    }

    let onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.register(name, email, password)
            .then(x => {
                navigate('/login');
            })
            .catch(e => {
                console.log(e);
                alert('Registration failed.');
            })
        navigate('/login');
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={onNameChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Register;