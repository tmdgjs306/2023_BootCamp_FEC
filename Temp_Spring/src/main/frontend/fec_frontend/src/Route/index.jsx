import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
// pages
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Homepage from "../Pages/Homepage/Homepage";
import { ErrorPage, ForbiddenPage } from '../Pages/OtherPages'
import { Dashboard, ManageUsers, Overview, Performance, Status, UserProfile } from "../Pages/Protected";


const CostumRoute = () => {
    const { token } = useAuth();

    // public routes
    const routesForPublic = [
        {
            path: '/', element: <Homepage />
        },
        {
            path: '/login', element: <Login />
        },
        {
            path: '/join', element: <Register />
        },

    ];

    // private route
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "/manageuser",
                    element: <ManageUsers />,
                },
                {
                    path: "/profile",
                    element: <UserProfile />,
                },
                {
                    path: "/overview",
                    element: <Overview />,
                },
                {
                    path: "/performance",
                    element: <Performance />,
                },
                {
                    path: "/status",
                    element: <Status />,
                },
            ],
        },
        {
            path: '/api/403', // Path for the forbidden page
            element: <ForbiddenPage />, // Show the 403 forbidden page
        },
        {
            path: '/api/404', // Catch-all route for unknown paths
            element: <ErrorPage />, // Show the 404 error page
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "api/login",
            element: <Login />,
        },
        {
            path: 'api/join',
            element: <Register />
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

export default CostumRoute;