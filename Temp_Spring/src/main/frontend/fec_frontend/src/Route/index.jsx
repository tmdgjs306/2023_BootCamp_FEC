import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
// pages
import Login from "../Pages/Login/Login";
import Logout from "../pages/Login/Logout";
import Register from "../Pages/Register/Register";
import Homepage from "../Pages/Homepage/Homepage";
import { Dashboard, ManageUsers, Overview, Performance, Status } from "../Pages/Protected";
import UserProfile from "../Pages/Protected/Profile/UserProfile";



const CostumRoute = () => {
    const { token } = useAuth();

    // public routes
    const routesForPublic = [
        {
            path: '/', element: <Homepage />
        },
        {
            path: 'api/login', element: <Login />
        },
        {
            path: 'api/join', element: <Register />
        },

    ];

    // private route
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "api/dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "api/manage-user",
                    element: <ManageUsers />,
                },
                {
                    path: "api/profile",
                    element: <UserProfile />,
                },
                {
                    path: "api/overview",
                    element: <Overview />,
                },
                {
                    path: "api/performance",
                    element: <Performance />,
                },
                {
                    path: "api/status",
                    element: <Status />,
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