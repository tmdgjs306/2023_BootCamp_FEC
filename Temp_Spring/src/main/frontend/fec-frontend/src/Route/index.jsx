import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../Pages/Login/Login";
import Logout from "../pages/Login/Logout";
import Register from "../Pages/Register/Register";
import Homepage from "../Pages/Homepage/Homepage";

const Routes = () => {
    const { token } = useAuth();

    // public routes
    const routesForPublic = [
        {
            path: '/', element: <div><Homepage /></div>
        },
        {
            path: '/login', element: <div><Login /></div>
        },
        {
            path: '/join', element: <div><Register /></div>
        },
    ];

    // private route
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "",
                    element: <div>User Home Page</div>,
                },
                {
                    path: "/profile",
                    element: <div>User Profile</div>,
                },
                {
                    path: "/logout",
                    element: <Logout />,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <div>Home Page</div>,
        },
        {
            path: "/login",
            element: <Login />,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;