import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./hook/useglobalreducer.jsx";
import { router } from "./routes.jsx";

function App() {
    return (
        <StoreProvider>
            <RouterProvider router={router} />
        </StoreProvider>
    );
}

export default App;
