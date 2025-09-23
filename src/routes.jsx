import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Contacts } from "./views/contactlist.jsx";
import { UpdateContacts } from "./views/contactform.jsx";
export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Contacts />} errorElement={<h1>¡No encontrado!</h1>} />
            <Route path="/updatecontacts" element={<UpdateContacts />} />
            <Route path="/updatecontacts/:id" element={<UpdateContacts />} />
        </>
    )
);