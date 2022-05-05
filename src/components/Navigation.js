import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import apiAccess from '../api/APIAccess';


const Navigation = (props) => {

    const handleLogout = () => {
        apiAccess.logout()
            .then(x => {
                props.onLogout();
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#">Find Nearby Places</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#/addPlace">Add Place</Nav.Link>
                    {
                        props.customer ?
                            <>
                                <Navbar.Text>
                                    Signed in as {props.customer}
                                </Navbar.Text>
                                <Nav.Link href="#/" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link href="#/login">Login</Nav.Link>
                                <Nav.Link href="#/register">Register</Nav.Link>
                            </>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;
