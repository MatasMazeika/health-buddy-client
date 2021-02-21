export const getAuthToken = () => localStorage.getItem('auth-token') || '';
export const removeAuthToken = () => localStorage.removeItem('auth-token');
export const saveAuthToken = (token) => localStorage.setItem('auth-token', token);
