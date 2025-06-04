import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import mongoose from 'mongoose';
import config from './config.js';

import userRouter from './user/userRouter.js';
import noteRouter from './notes/noteRouter.js';

// MiddleWare
import {errorHandler} from './middleWare/errorHandler.js';


// Connecting to mongo

const mongo_url = config.MONGO_URL;
console.log(`Connecting to MongoDB at ${mongo_url}`);
try {
    await mongoose.connect(mongo_url);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
}

const app = express();


app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
//app.use(express.static('../dist'));

app.get('/api/checker', (req, res) => {
    res.status(200).json({message:'Everything ok'});
});

//Router

app.use('/api/user', userRouter);
app.use('/api/note', noteRouter);


// End
app.use(history());
app.use(errorHandler);

export default app;





