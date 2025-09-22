import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" }); // Estado para el formulario
    const [editingId, setEditingId] = useState(null); // Estado para el ID del contacto en edición
    const navigate = useNavigate(); // Hook para navegación
    const { id } = useParams(); // Obtener el ID del contacto desde los parámetros de la URL
    const AGENDA = "josezl"; // Nombre de la agenda

    // Cargar datos del contacto si estamos en modo edición
    useEffect(() => {
        const fetchContacts = async () => {
        try {
            const res = await fetch(
            `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`
            );
            const data = await res.json();

            const contactToEdit = data.contacts.find(
            (c) => c.id.toString() === id
            );

            if (contactToEdit) { // Si encontramos el contacto, cargamos sus datos en el formulario
            setForm(contactToEdit);
            setEditingId(id);
            } else { // Si no encontramos el contacto, redirigimos a la lista
            alert("Contacto no encontrado");
            navigate("/");
            }
        } catch (error) {
            alert("Error cargando contactos");
            navigate("/");
        }
        };

        if (id) fetchContacts(); // Solo cargar si hay un ID en los parámetros
    }, [id, navigate]);

    // Manejo de cambios en los campos del formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (editingId) { // Si estamos editando, usamos PUT
            await fetch(
            `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts/${editingId}`,
            {
                method: "PUT",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            }
            );
        }  else { // Si es un nuevo contacto, usamos POST
            await fetch(
            `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`,
            {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            }
            );
        }
        navigate("/"); // Volver a la lista de contactos
        } catch (error) {
        alert("Error guardando contacto");
        }
    };

    // Renderizado del formulario
    return (
        <div className="container mt-4">
            <h1 className="mb-4">{editingId ? "Editar contacto" : "Añadir contacto"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Teléfono"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Dirección"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate("/")}
                    >
                        Atrás
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {editingId ? "Actualizar contacto" : "Añadir contacto"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
