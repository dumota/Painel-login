import axios from "axios";

const api = axios.create({
    baseURL: 'https://backpainellogin.herokuapp.com/'
});

export default api;
