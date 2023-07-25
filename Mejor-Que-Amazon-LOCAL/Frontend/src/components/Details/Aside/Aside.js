import { useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { archiveSell } from '../../../services/productData';
import { createChatRoom } from '../../../services/messagesData'
import './Aside.css';


function Aside({ params, history }) {
    const [showMsg, setShowMdg] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [message, setMessage] = useState("");
    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);

    const handleCloseArchive = () => setShowArchive(false);
    const handleShowArchive = () => setShowArchive(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        archiveSell(params._id)
            .then(res => {
                setShowArchive(false);
                history.push(`/profile/${params.seller}`);
            })
            .catch(err => console.log(err))
    }

    const handleMsgChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    const onMsgSent = (e) => {
        e.preventDefault();
        createChatRoom(params.sellerId, message)
            .then((res) => {
                history.push(`/messages/${res.messageId}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <aside>
            <div className="product-details-seller">
                <div id="priceLabel" className="col-lg-12">
                    <h4 id="product-price-heading">Precio </h4>
                    {params.isSeller &&
                        <>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Editar la venta</Tooltip>}>
                                <span id="edit-icon">
                                    <Link to={`/categories/${params.category}/${params._id}/edit`}><GrEdit /></Link>
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Archivar</Tooltip>}>
                                <span id="archive-icon" onClick={handleShowArchive}>
                                    <MdArchive />
                                </span>
                            </OverlayTrigger>

                        </>
                    }
                    {params.price && <h1 id="price-heading">Q{(params.price).toFixed(2)}</h1>}
                </div>
                {params.isAuth ? (<>
                    {!params.isSeller &&
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                            <RiMessage3Fill />Contacte al vendedor
                        </Button>
                    }
                    <Link to={`/profile/${params.sellerId}`}>
                        <Col lg={12}>
                            <img id="avatar" src={params.avatar} alt="user-avatar" />
                        </Col>
                        <Col lg={12}>
                            <p><BsFillPersonFill /> {params.name}</p>
                            <p><MdEmail /> {params.email}</p>
                            <p><MdPhoneAndroid /> {params.phoneNumber}</p>
                            <p><FaSellsy /> {params.createdSells} ventas</p>
                        </Col>
                    </Link>
                </>) : (
                        <p id="guest-msg"><Link to="/auth/login">Iniciar Sesión</Link> ahora para ponerse en contacto con el vendedor!</p>
                    )}
            </div>
            <Modal show={showMsg} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensaje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" name="textarea" onChange={handleMsgChange} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onMsgSent}>Enviar</Button>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showArchive} onHide={handleCloseArchive}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Estás seguro de que quieres archivar este artículo?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Haciendo click <strong>Archivar</strong>, esta venta cambiará
                    su estado a <strong>Archivado</strong>,
                    lo que significa que nadie más que usted podrá verlo.
                    Es posible que desee cambiar el estado a <strong>Actived</strong> si ha
                    vendido el artículo o no quiere venderlo más.
                    </p>

                    No te preocupes, puedes desarchivarlo en cualquier momento desde Perfil - ¡Vende!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseArchive}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Archivar
                    </Button>
                </Modal.Footer>
            </Modal>
        </aside>
    )
}

export default Aside;

/*68 {params.price && <h1 id="price-heading">€{(params.price).toFixed(2)}</h1>} */