const API_URL = 'http://localhost:5001/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Set token to localStorage
const setToken = (token) => localStorage.setItem('token', token);

// Remove token from localStorage
const removeToken = () => localStorage.removeItem('token');

// Get user from localStorage
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Set user to localStorage
const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

// Remove user from localStorage
const removeUser = () => localStorage.removeItem('user');

// API request helper
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getToken();
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  signup: async (name, email, password) => {
    const result = await apiRequest('/auth/signup', 'POST', { name, email, password });
    if (result.token) {
      setToken(result.token);
      setUser(result.user);
    }
    return result;
  },

  login: async (email, password) => {
    const result = await apiRequest('/auth/login', 'POST', { email, password });
    if (result.token) {
      setToken(result.token);
      setUser(result.user);
    }
    return result;
  },

  logout: () => {
    removeToken();
    removeUser();
  },

  getMe: async () => {
    return await apiRequest('/auth/me', 'GET');
  },

  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
};

// Projects APIs
export const projectsAPI = {
  getAll: async () => {
    return await apiRequest('/projects', 'GET');
  },

  getOne: async (id) => {
    return await apiRequest(`/projects/${id}`, 'GET');
  },

  create: async (projectData) => {
    return await apiRequest('/projects', 'POST', projectData);
  },

  update: async (id, projectData) => {
    return await apiRequest(`/projects/${id}`, 'PUT', projectData);
  },

  delete: async (id) => {
    return await apiRequest(`/projects/${id}`, 'DELETE');
  },

  fund: async (id, amount) => {
    return await apiRequest(`/projects/${id}/fund`, 'POST', { amount });
  },
};

export default {
  authAPI,
  projectsAPI,
};
