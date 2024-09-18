import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Axios = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error.response;

    return Promise.reject({ status, ...data });
  }
);

export default Axios;
