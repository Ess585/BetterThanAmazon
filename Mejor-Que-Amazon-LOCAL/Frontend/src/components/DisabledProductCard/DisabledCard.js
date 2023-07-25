import { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { RiDeviceRecoverFill } from 'react-icons/ri';
import { activateSell } from '../../services/productData';

function DisabledCard({ params, history }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        activateSell(params._id)
            .then(res => {
                history.push(`/categories/${params.category}/${params._id}/details`)
                setShow(false);
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="disabled-card">
            <Card>
                <Card.Img variant="top" src={params.image} />
                <Card.Body>
                    <Card.Title>{params.title}</Card.Title>
                    <Card.Text>Q{params.price}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        {params.addedAt} -  {params.city}
                        <span id="enableIcon" onClick={handleShow}><RiDeviceRecoverFill /></span>
                    </small>
                </Card.Footer>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Está seguro de que desea activar este elemento?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Haciendo click en <strong>Desarchivar</strong>, esta venta cambiará
                    su estado a <strong>Activa</strong>,
                    lo que significa que todos en este sitio web la verán.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Desarchivar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DisabledCard;
