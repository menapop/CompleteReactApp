import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-6d4e8-default-rtdb.firebaseio.com/'
});

export default instance ;
