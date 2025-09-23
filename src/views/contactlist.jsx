import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hook/useglobalreducer.jsx";
import ContactCard from "../components/contactcard";

export function Contacts() {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
        try {
            const resp = await fetch(store.baseUrl + "agendas/josezl/contacts");
            const data = await resp.json();
            dispatch({ type: "set-contacts", payload: data.contacts });
        } catch (err) {
            console.error("Error cargando contactos:", err);
        }
        };
        fetchContacts();
    }, [dispatch, store.baseUrl]);

    return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Lista de Contactos</h1>
            <button
            className="btn btn-primary"
            onClick={() => navigate("/updatecontacts")}
            >
            Añadir Contacto
            </button>
        </div>

        {store.contacts.length > 0 ? (
            store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
            ))
        ) : (
            <p>No hay contactos.</p>
        )}
        </div>
    );
}

