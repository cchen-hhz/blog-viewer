import axios from 'axios';


const query_all = async () => {
    const url = '/api/user/query_all';
    try {
        const response = await axios.get(url);
        return { status: response.status, data: response.data };
    } catch (err) {
        return { status: err.response?.status, data: err.response?.data };
    }
};

const qualify = async (username, password, usetoken) => {
    const url = '/api/user/qualify';
    try {
        const response = await axios.post(url, {
            username: username,
            password: password,
            usetoken: usetoken
        });
        return { status: response.status, data: response.data };
    } catch (err) {
        return { status: err.response?.status, data: err.response?.data };
    }
};

const register = async (username, password) => {
    const url = '/api/user/register';
    try {
        const response = await axios.post(url, {
            username: username,
            password: password
        });
        return { status: response.status, data: response.data };
    } catch (err) {
        return { status: err.response?.status, data: err.response?.data };
    }
};

export default {
    query_all,
    qualify,
    register
};

