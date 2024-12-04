import CryptoJS from 'crypto-js';

const SECRET_KEY = 'Omkar@123'; 


const saveDataToStorage = (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString(); 
    localStorage.setItem(key, encryptedData); 
  } catch (error) {
    console.error('Error encrypting data:', error);
  }
};


const getDataFromStorage = (key) => {
  const encryptedData = localStorage.getItem(key); 
  if (!encryptedData) return []; 
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY); 
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8); 
    return JSON.parse(decryptedData); 
  } catch (error) {
    console.error('Error decrypting data:', error); 
    return []; 
  }
};


const clearDataFromStorage = (key) => {
  localStorage.removeItem(key); 
};


export const getRolesFromStorage = () => getDataFromStorage('rolesData'); 
export const saveRolesToStorage = (roles) => saveDataToStorage('rolesData', roles); 
export const clearRolesFromStorage = () => clearDataFromStorage('rolesData'); 

export const getUsersFromStorage = () => getDataFromStorage('usersData'); 
export const saveUsersToStorage = (users) => saveDataToStorage('usersData', users); 
export const clearUsersFromStorage = () => clearDataFromStorage('usersData'); 


export const getStaffFromStorage = () => getDataFromStorage('staffData'); 
export const saveStaffToStorage = (staff) => saveDataToStorage('staffData', staff); 
export const clearStaffFromStorage = () => clearDataFromStorage('staffData'); 
