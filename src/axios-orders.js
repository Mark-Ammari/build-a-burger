import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d9463.firebaseio.com/'
})

export default instance