import React, { useState, useRef, useEffect } from "react";
import LOGO_IMG from "../../assets/Logo.jpg";
import { IoSearch } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import Modal from "../ui/Modal";
import Dropdown from "../ui/Dropdown";
import { getRolesFromStorage } from "../../utils/storageUtils";
import { checkAccess } from "../../utils/Roles";

const NavItem = ({ item }) => (
  <li className="list">
    <a href={item.link} className="list-items">
      {item.label}
    </a>
  </li>
);

const Header = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [currentRole, setCurrentRole] = useState("");
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const dropdownRef = useRef(null);
  const sideMenuRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData) {
      setLoggedInUser(userData);
      setCurrentRole(userData.role);
    }

    fetchRoles();

    const handleStorageChange = (event) => {
      if (event.key === "rolesData") {
        fetchRoles();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchRoles = () => {
    const storedRoles = getRolesFromStorage();
    setRoles(storedRoles);
    setRoleOptions(storedRoles.map((role) => role.name));
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      sideMenuRef.current &&
      !sideMenuRef.current.contains(event.target)
    ) {
      setActiveIcon(null);
      setOpenSideMenu(false); // Close the sidebar
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconClick = (iconName) =>
    setActiveIcon((prev) => (prev === iconName ? null : iconName));

  const handleProfileClick = () => setIsProfileModalOpen(true);

  const handleLogoutClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  const handleRoleSwitch = (role) => {
    const updatedUser = { ...loggedInUser, role };
    setCurrentRole(role);
    setLoggedInUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
  };

  const navItems = [
    { label: "Dashboard", link: "/dashboard", permission: "Dashboard" },
    { label: "Manage User", link: "/user-management", permission: "User" },
    { label: "Manage Role", link: "/role-management", permission: "Role" },
    { label: "Manage Family", link: "/family-management", permission: "Family" },
    { label: "Manage Staff", link: "/staff-management", permission: "Staff" },
    { label: "Family", link: "/family", permission: "FamilyProfile" },
    { label: "Staff", link: "/staff", permission: "StaffProfile" },
  ];

  const allowedNavItems = navItems.filter((item) =>
    checkAccess(item.permission, roles)
  );

  return (
    <header className="header">
      <div className="container">
        <div className="content-container">
          <div className="upper-header">
            <img src={LOGO_IMG} alt="Logo" className="logo" />
            <div className="search-container">
              <IoSearch />
              <input
                type="text"
                className="header-search-input"
                placeholder="Search.."
              />
            </div>
            <div className="profile-container" ref={dropdownRef}>
              <div className="icon-wrapper">
                <IoPersonOutline
                  className={`profile-icon ${activeIcon === "person" ? "active" : ""
                    }`}
                  onClick={() => handleIconClick("person")}
                />
                {activeIcon === "person" && (
                  <div className="dropdown-menu profile-dropdown">
                    <a href="#" onClick={handleProfileClick}>
                      Profile
                    </a>
                    <a href="/settings">Settings</a>
                    <a href="/" onClick={handleLogoutClick}>
                      Logout
                    </a>
                  </div>
                )}
              </div>
              <div className="icon-wrapper notification-icon">
                <IoIosNotificationsOutline
                  className={`profile-icon ${activeIcon === "notifications" ? "active" : ""
                    }`}
                  onClick={() => handleIconClick("notifications")}
                />
                {activeIcon === "notifications" && (
                  <div className="dropdown-menu notifications-dropdown">
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
              <div className="icon-wrapper menu-icon">
              <CiMenuBurger onClick={() => setOpenSideMenu(!openSideMenu)} />
              </div>
            </div>
            <nav
              ref={sideMenuRef}
              className={`nav-sm ${openSideMenu ? "open" : "close"}`}
            >
              <ul className="nav-list">
                {allowedNavItems.map((item, index) => (
                  <NavItem key={index} item={item} />
                ))}
              </ul>
            </nav>
          </div>
          <nav className="lower-header nav">
            <ul className="nav-list nav-lg">
              {allowedNavItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {isProfileModalOpen && loggedInUser && (
        <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
          <div className="profile-modal-content">
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {loggedInUser.name}
            </p>
            <p>
              <strong>Email:</strong> {loggedInUser.email}
            </p>
            <p>
              <strong>Role:</strong> {loggedInUser.role}
            </p>
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;
