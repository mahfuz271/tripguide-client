import { createBrowserRouter } from "react-router-dom";
import Error from "../Components/Error/Error";
import Homepage from "../Components/Homepage/Homepage";
import Blog from "../Components/Blog/Blog";
import Main from "../Layout/Main";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Logout from "../Components/Logout/Logout";
import Services from "../Components/Services/Services";
import AddService from "../Components/Services/AddService";
import ManageServices from "../Components/Services/ManageServices";
import ServiceSingle from "../Components/Services/ServiceSingle";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Homepage />,
                loader: () => {
                    return fetch(`${process.env.REACT_APP_SERVER_URL}/services?limit=3`);
                }
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/login",
                element: <PublicRoute><Login /></PublicRoute>
            },
            {
                path: "/logout",
                element: <PrivateRoute><Logout /></PrivateRoute>
            },
            {
                path: "/signup",
                element: <PublicRoute><Signup /></PublicRoute>
            },

            {
                path: "/services",
                element: <Services></Services>,
                loader: () => {
                    return fetch(`${process.env.REACT_APP_SERVER_URL}/services`);
                }
            },

            {
                path: "/addService",
                element: <PrivateRoute><AddService></AddService></PrivateRoute>
            },

            {
                path: "/ManageServices",
                element: <PrivateRoute><ManageServices></ManageServices></PrivateRoute>
            },
            {
                path: "/services/:id",
                element: <PrivateRoute><ServiceSingle /></PrivateRoute>,
                loader: ({ params }) => {
                    return fetch(`${process.env.REACT_APP_SERVER_URL}/services/${params.id}`);
                }
            },



            {
                path: '*',
                element: <Error />
            }
        ]
    }
]);

export default Router;