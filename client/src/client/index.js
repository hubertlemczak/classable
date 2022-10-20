import axios from 'axios';

// eslint-disable-next-line no-undef
const host = process.env.REACT_APP_BASE_URL;

const client = {
  get: async path => {
    const token = localStorage.getItem('classable-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.get(`${host}${path}`, { headers });
  },
  post: async (path, data) => {
    const token = localStorage.getItem('classable-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(`${host}${path}`, data, { headers });
  },
  patch: async (path, data) => {
    const token = localStorage.getItem('classable-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.patch(`${host}${path}`, data, { headers });
  },
  delete: async path => {
    const token = localStorage.getItem('classable-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.delete(`${host}${path}`, { headers });
  },
};

export default client;
