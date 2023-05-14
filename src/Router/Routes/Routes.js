import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import Checkout from "../../Pages/Checkout/Checkout";
import Orders from "../../Pages/Orders/Orders";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/", element: <Main />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            {
                path: '/checkout/:id', element: <PrivateRoute><Checkout /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://genius-car-server-woad-three.vercel.app/services/${params.id}`)
            },
            { path: '/orders', element: <Orders /> },
        ]
    }
])

export default router;