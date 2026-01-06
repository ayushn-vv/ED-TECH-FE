import axios from 'axios';

const apiConnect = axios.create({
  baseURL: 'http://localhost:5002/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Add interceptor to attach token automatically
apiConnect.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get token from storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiConnect;
