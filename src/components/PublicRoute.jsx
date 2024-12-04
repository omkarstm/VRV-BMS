import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, redirectPath = '/dashboard', children }) => {
    switch (JSON.parse(localStorage.getItem('loggedInUser'))?.role) {
        case 'Admin':
            redirectPath = '/dashboard';
            break;
        case 'Moderator':
            redirectPath = '/user-management'
            break;
        case 'Family':
            redirectPath = '/family';
            break;
        case "Staff":
            redirectPath = '/staff'
            break;
        default:
            redirectPath = '/'

    }
    if (isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PublicRoute;
