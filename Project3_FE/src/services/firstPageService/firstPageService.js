import axios from 'axios';

export const contactBackend = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => console.log(res))
        .catch(err => console.error(err))
}

