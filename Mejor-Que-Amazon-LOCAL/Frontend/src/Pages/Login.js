import { useState, useContext } from 'react';
import { Context } from '../ContextStore';
import { loginUser } from '../services/userData'
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleSider from '../components/Siders/SimpleSider';

function Login({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { setUserData } = useContext(Context)

    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        loginUser(user)
            .then(res => {
                if (!res.error) {
                    setUserData(res.user)
                    history.push('/')
                } else {
                    setLoading(false);
                    setError(res.error.message);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error de inicio de sesión: ', err))
    }

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Iniciar sesión</h1>
                <Form className="col-lg-6" onSubmit={handleSubmitLogin}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Dirección de correo electrónico</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Ingrese correo electrónico" onChange={handleChanges} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Contraseña" onChange={handleChanges} required />
                    </Form.Group>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Espere por favor... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Iniciar sesión</Button>
                    }
                    <p className="bottom-msg-paragraph">¿No tienes una cuenta? <Link to="/auth/register">Regístrate</Link>!</p>
                </Form>
            </div>
        </>
    )
}

export default Login;