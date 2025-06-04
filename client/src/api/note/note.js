
import axios from 'axios';

class note{
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }       
};

const query_all = async () => {
    const url = '/api/note/query_all';
    try {
        const response = await axios.get(url);
        const note = response.data.map(item => ({
            title: item.title,
            content: item.content,
            author: item.author.username,
            author_uid: item.author.uid,
            id: item.uid,
        }));
        return {status: response.status, data: note};
    } catch (err) {
        return {status: err.response?.status, data: err.response?.data};
    }
}

const user_query = async (uid) => {
    const url = `/api/note/userquery/${uid}`;
    try {
        const response = await axios.get(url);
        const note = response.data.map(item => ({
            title: item.title,
            content: item.content,
            author: item.author.username,
            id: item.uid,
        }));
        console.log("Get",note);
        return {status: response.status, data: note};
    } catch (err) {
        return {status: err.response?.status, data: err.response?.data};
    }
};

const note_query = async (id) => {
    const url = `/api/note/notequery/${id}`;
    try {
        const response = await axios.get(url);
        const note = {
            title: response.data.title,
            content: response.data.content,
            author: response.data.author.username,
            author_uid: response.data.author.uid,
            id: response.data.uid,
        };
        return {status: response.status, data: note};
    } catch (err) {
        return {status: err.response?.status, data: err.response?.data};
    }
};

const create = async (note, token) => {
    const url = '/api/note/create';
    try {
        const response = await axios.post(url, note, {
            headers: {
                authorization: `bearer ${token}`
            }
        });
        return {status: response.status, data: response.data};
    } catch (err) {
        return {status: err.response?.status, data: err.response?.data};
    }
};

const update = async (id, note, token) => {
    const url = `/api/note/update/${id}`;
    try {
        const response = await axios.put(url, note, {
            headers: {
                authorization: `bearer ${token}`
            }
        });
        return {status: response.status, message: response.data.message};
    } catch (err) {
        return {status: err.response?.status, message: err.response?.data?.message};
    }
};

const remove = async (id, token) => {
    const url = `/api/note/${id}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                authorization: `bearer ${token}`
            }
        });
        return {status: response.status};
    } catch (err) {
        return {status: err.response?.status, data: err.response?.data};
    }
};

export default {
    note,
    query_all,
    user_query,
    note_query,
    create,
    update,
    remove
};