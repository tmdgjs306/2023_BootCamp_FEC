import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Import the AuthContext from your AuthProvider file

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return authContext;
};
export default useAuth;