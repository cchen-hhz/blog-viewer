import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const schema = {
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 20,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        unique: true,
        default: () => nanoid(10),
    },
    isadmin: {
        type: Boolean,
        default: false,
    },
    isroot: {
        type: Boolean,
        default: false,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note',
        }
    ]
};

const user = mongoose.model('User', schema);

export default user;