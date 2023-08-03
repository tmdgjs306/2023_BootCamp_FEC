// DashboardPage.js
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage or state management solution
    localStorage.removeItem('token');

    // Redirect to the homepage
    navigate('/dashboard');
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {/* Your dashboard content */}
    </>
  );
}

export default DashboardPage;
