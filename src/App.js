import { BrowserRouter as Router, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import Header from './components/ui/Header';
import { initializeData } from './Data';
import './App.css';
import './styles/main.scss';
import FamilyManagement from './pages/FamilyManagement';
import Staff from './pages/Staff';
import StaffManagement from './pages/StaffManagement';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { checkAccess } from './utils/Roles';
import Family from './pages/Family';

function App() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const { initializedRoles, initializedUsers, initializedStaff } = initializeData();
    setRoles(initializedRoles);
    setUsers(initializedUsers);
    setStaff(initializedStaff);

    const user = localStorage.getItem("loggedInUser")
    if (user) setUserLoggedIn(JSON.parse(user));
    setIsLoading(false);
  }, []);

  if (isLoading) return null
  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<PublicRoute isAuthenticated={Boolean(userLoggedIn)}><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute isAuthenticated={Boolean(userLoggedIn)}><Signup /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute isAllowed={(checkAccess("Dashboard", roles))}><WithHeader><Dashboard /></WithHeader></PrivateRoute>} />
        <Route path="/user-management" element={<PrivateRoute isAllowed={(checkAccess("User", roles))}><WithHeader><UserManagement users={users} setUsers={setUsers} roles={roles} /></WithHeader></PrivateRoute>} />
        <Route path="/role-management" element={<PrivateRoute isAllowed={(checkAccess("Role", roles))}><WithHeader><RoleManagement roles={roles} setRoles={setRoles} /></WithHeader></PrivateRoute>} />
        <Route path="/family-management" element={<PrivateRoute isAllowed={(checkAccess("Family", roles))}><WithHeader><FamilyManagement users={users} setUsers={setUsers} /></WithHeader></PrivateRoute>} />
        <Route path="/staff-management" element={<PrivateRoute isAllowed={(checkAccess("Staff", roles))}><WithHeader><StaffManagement staff={staff} setStaff={setStaff} /></WithHeader></PrivateRoute>} />
        <Route path="/staff" element={<PrivateRoute isAllowed={(checkAccess("StaffProfile", roles))}><WithHeader><Staff /></WithHeader></PrivateRoute>} />
        <Route path="/family" element={<PrivateRoute isAllowed={(checkAccess("FamilyProfile", roles))}><WithHeader><Family /></WithHeader></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  const excludePaths = ['/', '/signup']; // Routes where the Header should not appear

  return !excludePaths.includes(location.pathname) ? <Header /> : null;
}

function WithHeader({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}

export default App;
