


import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: String,
    code: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    collections: [

    ],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
});

export const User = model('User', userSchema);
