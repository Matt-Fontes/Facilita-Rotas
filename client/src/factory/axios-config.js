// Arquivo para criar instancia universal do axios
import Axios from 'axios';


// Endpoint base do Backend
const baseURL = process.env.REACT_APP_BACKEND;

console.log(baseURL);

const axios = Axios.create({
    baseURL,
});

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axios;
