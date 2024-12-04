export const handleInputChange = (e, setNewRole) => {
  const { name, value } = e.target;
  setNewRole((prev) => ({ ...prev, [name]: value }));
};

export const handlePermissionToggle = (permission, setNewRole) => {
  setNewRole((prev) => ({
    ...prev,
    permissions: prev.permissions.includes(permission)
      ? prev.permissions.filter((perm) => perm !== permission)
      : [...prev.permissions, permission],
  }));
};

export const addRole = (newRole, roles, setRoles, saveRolesToStorage, setNewRole, setIsModalOpen) => {
  if (!newRole.name.trim()) {
    alert('Role name is required.');
    return;
  }

  if (newRole.permissions.length === 0) {
    alert('At least one permission must be selected.');
    return;
  }

  const updatedRoles = [...roles, { id: Date.now(), ...newRole }];
  setRoles(updatedRoles);
  saveRolesToStorage(updatedRoles);
  setNewRole({ name: '', description: '', permissions: [] });
  setIsModalOpen(false);
  window.location.reload();
};

export const saveRole = (editingRole, newRole, roles, setRoles, saveRolesToStorage, setEditingRole, setNewRole, setIsModalOpen) => {
  if (!newRole.name.trim()) {
    alert('Role name is required.');
    return;
  }

  if (newRole.permissions.length === 0) {
    alert('At least one permission must be selected.');
    return;
  }

  const updatedRoles = roles.map((role) =>
    role.id === editingRole ? { ...role, ...newRole } : role
  );
  setRoles(updatedRoles);
  saveRolesToStorage(updatedRoles);
  setEditingRole(null);
  setNewRole({ name: '', description: '', permissions: [] });
  setIsModalOpen(false);
};

export const deleteRole = (id, roles, setRoles, saveRolesToStorage) => {
  const updatedRoles = roles.filter((role) => role.id !== id);
  setRoles(updatedRoles);
  saveRolesToStorage(updatedRoles);
};

export const checkAccess = (permission, roles) => {
  const userData = localStorage.getItem("loggedInUser");
  if (!userData) return false;

  const loggedInUser = JSON.parse(userData);
  if (!loggedInUser || !roles) return false;

  const userRole = roles.find((role) => role.name === loggedInUser.role);
  return userRole?.permissions.includes(permission) || false;
};
