import axios from 'axios';

import user from './users/login.js';
import note from './note/note.js';

const checker = async () => {
    const url = '/api/checker';
    const response = await axios.get(url);
    return response.status;
}

export default {
    checker,
    user,
    note
};

