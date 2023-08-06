import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Homepage from "../Homepage/Homepage";

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken();
        navigate("/", { replace: true });
    };

    setTimeout(() => {
        handleLogout();
    }, 3 * 1000);

    return <>Homepage</>;
};

export default Logout;

