import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
<<<<<<< Updated upstream
=======
// pages
>>>>>>> Stashed changes
import Login from "../Pages/Login/Login";
import Logout from "../pages/Login/Logout";
import Register from "../Pages/Register/Register";
import Homepage from "../Pages/Homepage/Homepage";
import { Dashboard, ManageUsers, Overview, Performance, Status } from "../Pages/Protected";
<<<<<<< Updated upstream
=======
import UserProfile from "../Pages/Protected/Profile/UserProfile";
>>>>>>> Stashed changes


const CostumRoute = () => {
    const { token } = useAuth();

    // public routes
    const routesForPublic = [
        {
            path: '/', element: <Homepage />
        },
        {
<<<<<<< Updated upstream
            path: '/login', element: <Login />
        },
        {
            path: '/join', element: <Register />
        },
        {
            path: "/logout",
            element: <Logout />,
        },
=======
            path: 'api/login', element: <Login />
        },
        {
            path: 'api/join', element: <Register />
        },

>>>>>>> Stashed changes
    ];

    // private route
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
<<<<<<< Updated upstream
                    path: "/dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "/manage-user",
                    element: <ManageUsers />,
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
=======
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
>>>>>>> Stashed changes
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
            path: "/login",
            element: <Login />,
        },
        {
<<<<<<< Updated upstream
            path: '/join', element: <Register />
=======
            path: '/join', 
            element: <Register />
>>>>>>> Stashed changes
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