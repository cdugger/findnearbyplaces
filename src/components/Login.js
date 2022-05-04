import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiAccess from '../api/APIAccess';

const Login = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { from } = useParams();

    let onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.login(email, password)
            .then(x => {
                if (x.done) {
                    props.isLoggedIn(email);
                    if (from) {
                        navigate('/place/' + from);
                    } else {
                        navigate('/');
                    }

                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(e => {
                console.log(e);
                alert('Invalid credentials');
            })
    }

    return (
        <Form onSubmit={onSubmitHandler}>
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
                Sign in
            </Button>
        </Form>
    );
}

export default Login;