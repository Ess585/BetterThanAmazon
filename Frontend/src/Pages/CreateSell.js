import { Component } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { createProduct } from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", price: "", description: "", city: "", category: "", image: "", loading: false, alertShow: false, errors: [] };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.files) {
            this.setState({ image: e.target.files[0] })
        }
    };

    onSubmitHandler(e) {
        e.preventDefault();
        let { title, price, description, city, category, image } = this.state;
        let obj = { title, price, description, city, category }
        this.setState({ loading: true })
        this.getBase64(image)
            .then((data) => {
                obj['image'] = data;
                createProduct(obj)
                    .then(res => {
                        if (res.error) {
                            this.setState({ loading: false })
                            this.setState({ errors: res.error })
                            this.setState({ alertShow: true })
                        } else {
                            this.props.history.push(`/categories/${category}/${res.productId}/details`)
                        }
                    })
                    .catch(err => console.error('Error al crear producto: ', err))
            })
            .catch(err => console.error('Converting to base64 err: ', err));
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        return (
            <>
                <SimpleSider />
                <div className='container'>
                    <h1 className="heading">Agregar un producto</h1>
                    <Form onSubmit={this.onSubmitHandler}>
                        {this.state.alertShow &&
                            <Alert variant="danger" onClose={() => this.setState({ alertShow: false })} dismissible>
                                <p>
                                    {this.state.errors}
                                </p>
                            </Alert>
                        }
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Introduce el título" name="title" required onChange={this.onChangeHandler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="number" step="0.01" placeholder="Precio" name="price" required onChange={this.onChangeHandler} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridDescription.ControlTextarea1">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" required onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control name="city" placeholder="Madrid" required onChange={this.onChangeHandler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." name="category" required onChange={this.onChangeHandler}>
                                    <option>Elegir...</option>
                                    <option>Propiedades</option>
                                    <option>Vehículos</option>
                                    <option>Electrónicos</option>
                                    <option>Ropa</option>
                                    <option>Juguetes</option>
                                    <option>Hogar</option>
                                    <option>Jardinería</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridImage" >
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control name="image" type="file" required onChange={this.onChangeHandler} />
                            </Form.Group>
                        </Form.Row>
                        {this.state.loading ?
                            <Button className="col-lg-12" variant="dark" disabled >
                                Espere por favor... <Spinner animation="border" />
                            </Button>
                            :
                            <Button className="col-lg-12" variant="dark" type="submit">Agregar producto</Button>
                        }
                    </Form>
                </div>
            </>
        )
    }
}

export default AddProduct;