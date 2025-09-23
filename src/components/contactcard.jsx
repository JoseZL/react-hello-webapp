// src/components/ContactCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hook/useglobalreducer.jsx";
import ModalConfirm from "./confirmdelete.jsx";

export default function ContactCard({ contact }) {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
        const resp = await fetch(
            `${store.baseUrl}agendas/josezl/contacts/${contact.id}`,
            { method: "DELETE" }
        );
        if (resp.ok) {
            const newContacts = store.contacts.filter((c) => c.id !== contact.id);
            dispatch({ type: "set-contacts", payload: newContacts });
        }
        } catch (err) {
        console.error("Error eliminando contacto:", err);
        } finally {
        setShowModal(false);
        }
    };

return (
    <>
        <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">{contact.address}</p>
                <p className="card-text">{contact.phone}</p>
                <p className="card-text">{contact.email}</p>
            </div>
            <div>
                <button
                className="btn btn-success me-2"
                onClick={() => navigate(`/updatecontacts/${contact.id}`)}
                >
                Editar
                </button>
                <button className="btn btn-danger" onClick={() => setShowModal(true)}>
                Eliminar
                </button>
            </div>
            </div>
        </div>

        {showModal && (
            <ModalConfirm
            contactName={contact.name}
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
            />
        )}
        </>
    );
}
