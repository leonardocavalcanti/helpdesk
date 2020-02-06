import axios from 'axios';

export function list(token) {
    return axios.get(`/api/tickets`, { headers: { Authorization: `Bearer ${token}` } });
}