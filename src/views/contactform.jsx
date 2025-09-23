import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hook/useglobalreducer.jsx";

export function UpdateContacts() {
    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(store.contactInfo);

    useEffect(() => {
        if (id) {
        const contact = store.contacts.find((c) => c.id === parseInt(id));
        if (contact) {
            setFormData(contact);
        }
        } else {
        setFormData({ name: "", phone: "", email: "", address: "" });
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
        if (id) {
            // UPDATE
            const resp = await fetch(`${store.baseUrl}agendas/josezl/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });
            if (resp.ok) {
            const updated = await resp.json();
            const newContacts = store.contacts.map((c) =>
                c.id === updated.id ? updated : c
            );
            dispatch({ type: "set-contacts", payload: newContacts });
            }
        } else {
            // CREAR
            const resp = await fetch(`${store.baseUrl}agendas/josezl/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });
            if (resp.ok) {
            const created = await resp.json();
            dispatch({ type: "set-contacts", payload: [...store.contacts, created] });
            }
        }
        navigate("/");
        } catch (err) {
        console.error("Error guardando contacto:", err);
        }
    };

return (
    <div className="container mt-4">
        <h1 className="mb-4">{id ? "Editar Contacto" : "Añadir Contacto"}</h1>
        <form>
            <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
            />
            </div>
            <div className="d-flex justify-content-between">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
            >
                Atrás
            </button>
            <button type="button" className="btn btn-success" onClick={handleSave}>
                Guardar
            </button>
            </div>
        </form>
        </div>
    );
}
