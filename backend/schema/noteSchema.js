import mongoose, { MongooseError } from 'mongoose';
import { nanoid } from 'nanoid';

const noteSchame = {
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    content: {
        type: String,
        default: '什么都没写啊',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    uid: {
        type: String,
        unique: true,
        default: () => nanoid(10),
    }
};

const note = mongoose.model('Note', noteSchame);

export default note;