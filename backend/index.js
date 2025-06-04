import app from './app.js';
import config from './config.js';
import http from 'http';

const PORT = config.PORT;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

