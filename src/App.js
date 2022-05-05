import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import AddPlace from './components/AddPlace';
import Register from './components/Register';
import Container from 'react-bootstrap/Container';
import Place from './components/Place';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));

  let loginHandler = (email) => {
    localStorage.setItem('customer', email);
    setCustomer(email);
  }

  const logoutHandler = () => {
    localStorage.removeItem('customer');
    setCustomer(undefined);
  }

  return (
    <HashRouter>
      <Container>
        <Row>
          <Col>
            <Navigation customer={customer} onLogout={logoutHandler} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login/:from' element={<Login isLoggedIn={loginHandler} />} />
              <Route path='/login' element={<Login isLoggedIn={loginHandler} />} />
              <Route exact path='/addPlace' element={<AddPlace />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/place/:id' element={
                <ProtectedRoute customer={customer}><Place /></ProtectedRoute>
              } />
            </Routes>
          </Col>
        </Row>
      </Container>
    </HashRouter>
  );
}

const ProtectedRoute = ({ customer, children }) => {
  const { id } = useParams();
  if (customer) {
    return children;
  } else {
    return <Navigate to={`/login/${id}`} />
  }
}

export default App;
