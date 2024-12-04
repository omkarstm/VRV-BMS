import {
  getRolesFromStorage,
  saveRolesToStorage,
  getUsersFromStorage,
  saveUsersToStorage,
  getStaffFromStorage,
  saveStaffToStorage,
} from './utils/storageUtils';

export const initializeData = () => {
  const defaultRoles = [
    { id: 1, name: 'Admin', permissions: ['Dashboard', 'User', 'Role', 'Family', 'Staff'] },
    { id: 2, name: 'Moderator', permissions: ['Dashboard', 'Family', 'Staff','User'] },
    { id: 3, name: 'Family', permissions: ['FamilyProfile'] },
    { id: 4, name: 'Staff', permissions: [ 'StaffProfile'] },
  ];
  

  const defaultUsers = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'Admin', password: 'password123' },
    { id: 2, name: 'Ishita Verma', email: 'ishita.verma@example.com', role: 'Moderator', password: 'password123' },
    { id: 3, name: 'Vikram Singh', email: 'vikram.singh@example.com', role: 'Moderator', password: 'password123' },
    { id: 4, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', role: 'Family', password: 'password123' },
    { id: 5, name: 'Kabir Gupta', email: 'kabir.gupta@example.com', role: 'Family', password: 'password123' },
    { id: 6, name: 'Meera Nair', email: 'meera.nair@example.com', role: 'Family', password: 'password123' },
    { id: 7, name: 'Mohan Das', email: 'mohan.das@example.com', role: 'Family', password: 'password123' },
  ];

  const defaultStaff = [
    { id: 1, name: "Rajesh Kumar", role:"Staff", designation: "Security Guard", email: "rajesh.staff@example.com", password: "password123", arrival: "7:00 AM", departure: "7:00 PM", leave: "No", floor: "Ground Floor" },
    { id: 2, name: "Anita Sharma",role:"Staff", designation: "Cleaner", email: "anita.staff@example.com", password: "password123", arrival: "8:00 AM", departure: "4:00 PM", leave: "No", floor: "First Floor" },
    { id: 3, name: "Vikram Singh",role:"Staff", designation: "Electrician", email: "vikram.staff@example.com", password: "password123", arrival: "9:00 AM", departure: "6:00 PM", leave: "No", floor: "Second Floor" },
    { id: 4, name: "Priya Mehta",role:"Staff", designation: "Security Guard", email: "priya.staff@example.com", password: "password123", arrival: "8:00 AM", departure: "8:00 PM", leave: "Yes", floor: "Third Floor" },
    { id: 5, name: "Ramesh Yadav",role:"Staff", designation: "Cleaner", email: "ramesh.staff@example.com", password: "password123", arrival: "6:00 AM", departure: "2:00 PM", leave: "No", floor: "Fourth Floor" },
  ];

  let roles = getRolesFromStorage();
  if (roles.length === 0) {
    roles = defaultRoles;
    saveRolesToStorage(roles);
  }

  let users = getUsersFromStorage();
  if (users.length === 0) {
    users = [...defaultUsers];
    saveUsersToStorage(users);
  }


  let staff = getStaffFromStorage();
  if (staff.length === 0) {
    staff = defaultStaff;
    saveStaffToStorage(staff);
  }

  return {
    initializedRoles: roles,
    initializedUsers: users,
    initializedStaff: staff,
  };
};
