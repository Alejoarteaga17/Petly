const rawApiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000').toString().trim();

// Remove trailing slash if present
export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '');

const API_PREFIX = `${API_BASE_URL}/api`;

export const USERS_API_URL = `${API_PREFIX}/users`;
export const AUTH_API_URL = `${API_PREFIX}/auth`;
export const CATEGORIES_API_URL = `${API_PREFIX}/categories`;
export const DOMESTIC_ANIMALS_API_URL = `${API_PREFIX}/domestic-animals`;
export const REVIEWS_API_URL = `${API_PREFIX}/reviews`;

export default API_BASE_URL;
