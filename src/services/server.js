
import axios from 'axios';

const server = async (url, method, queryParams, body) => {
    try {
        if(method === 'GET') {
            return await axios.get(url+queryParams);
        } else if(method === 'POST') return await axios.post(url, body);
    } catch (ex) {
        return { 'message': ex.message, 'color': 'error', 'flag': true };
    }
}

export default server;