import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.alexhsbae.com/api/5/'
});

export default instance;
