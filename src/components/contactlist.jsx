import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../img/imageRober.png"

function ContactList() {
    const [contacts, setContacts] = useState([]); // Estado para almacenar los contactos
    const navigate = useNavigate(); // Hook para navegación
    const AGENDA = "josezl"; // Nombre de la agenda

    // Función para obtener los contactos desde la API
    const getContacts = async () => {
        try {
        const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`
        );
        const data = await response.json();
        setContacts(data.contacts || []); // Asegurarse de que sea un array
        } catch (error) {
        alert("Error cargando contactos"); // Manejo de errores
        }
    };

    // Función para eliminar un contacto
    const deleteContactApi = async (id) => {
        try {
        await fetch(
            `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts/${id}`,
            { method: "DELETE" } // Eliminar el contacto por ID
        );
        getContacts();
        } catch (error) {
        alert("Error eliminando contacto");
        }
    };

    // Cargar contactos al montar el componente
    useEffect(() => {
        getContacts();
    }, []);

    // Renderizado del componente
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Agenda de Contactos</h1>
            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/add")}
            >
                Añadir contacto
            </button>

            <div className="row">
                {contacts.map((c) => (
                    <div key={c.id} className="col-12 mb-3">
                        <div className="card d-flex flex-row align-items-center p-2">
                        <img
                            src={image}
                            alt="Foto del contacto"
                            className="rounded-circle me-3"
                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }}
                        />
                        {/* Datos del contacto */}
                        <div className="flex-grow-1">
                            <h5 className="mb-1">Nobre: {c.name}</h5>
                            <p className="mb-0">Correo: {c.email}</p>
                            <p className="mb-0">Teléfono: {c.phone}</p>
                            <p className="mb-0">Dirección: {c.address}</p>
                        </div>
                        {/* Botones */}
                        <div className="d-flex flex-column gap-2 ms-3">
                            <button
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                                localStorage.setItem("contactToEdit", JSON.stringify(c));
                                navigate(`/edit/${c.id}`);}}
                            >
                            Editar
                            </button>
                            <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteContactApi(c.id)}
                            >
                            Eliminar
                            </button>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactList;
