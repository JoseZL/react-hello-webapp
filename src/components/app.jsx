import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importar componentes de React Router
import ContactList from "./contactlist"; // Importar el componente de la lista de contactos
import ContactForm from "./contactform"; // Importar el componente del formulario de contacto

// Componente principal de la aplicación
function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add" element={<ContactForm />} />
            <Route path="/edit/:id" element={<ContactForm />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
