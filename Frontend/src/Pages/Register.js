import { useState } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';

function Register({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: null,
        lastName: null,
        gender: null,
        phoneNumber: '',
        email: "",
        password: "",
        repeatPassword: ""
    });

    const handleChanges = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmitReg = (e) => {
        e.preventDefault();
        setLoading(true);
        registerUser(userData)
            .then(res => {
                if (!res.error) {
                    history.push('/auth/login')
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error de registro: ', err))
    }

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Regístrate</h1>
                <Form className="col-lg-8" onSubmit={handleSubmitReg}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Nombre *</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Juan Pérez" onChange={handleChanges} required />
                            <Form.Text muted>
                                El nombre puede ser el tuyo o un nombre de usuario.
                            </Form.Text>
                        </Form.Group>
                        {/* <Form.Group controlId="forLastName" className="col-lg-4">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" placeholder="Ivanov" onChange={handleChanges} />
                        </Form.Group> */}
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Género</Form.Label>
                            <Form.Control as="select" defaultValue="No especificado" name="gender" onChange={handleChanges}>
                                <option>Masculino</option>
                                <option>Femenino</option>
                                <option>No especificado</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Número de teléfono *</Form.Label>
                            <Form.Control type="text" name="phoneNumber" placeholder="12345678" onChange={handleChanges} required />
                            <Form.Text muted>
                                El número de teléfono debe ser válido.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Dirección de correo electrónico *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="123ABC@gmail.com" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Contraseña *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Contraseña" onChange={handleChanges} required />
                            <Form.Text muted>
                                Su contraseña debe tener entre 8 y 20 caracteres.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Repita la contraseña *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repita la contraseña" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Espere por favor... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Regístrate</Button>
                    }

                    <p className="bottom-msg-paragraph">¿Ya tienes una cuenta? <Link to="/auth/login">Iniciar sesión</Link>!</p>
                </Form>
            </div>
        </>
    )
}

export default Register;