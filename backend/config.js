import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,
};