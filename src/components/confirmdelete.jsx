import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalConfirm({ contactName, onConfirm, onCancel }) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        setTimeout(onCancel, 200); // Espera al cierre del modal
    };

    const handleConfirm = () => {
        setShow(false);
        setTimeout(onConfirm, 200);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            ¿Estás seguro de que quieres eliminar a <b>{contactName}</b>?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
            Eliminar
            </Button>
        </Modal.Footer>
        </Modal>
    );
}
