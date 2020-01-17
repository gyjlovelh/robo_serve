/**
 * Created by guanyj on  1/16/20
 */
import {Schema, model} from 'mongoose';

const userSchema = new Schema({

    account: {
        type: String,
        unique: true,
        required: '{PATH} 为必填项！'
    },

    password: {
        type: String,
        required: '{PATH} 为必填项！'
    },

    nickname: String
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    },
    versionKey: false
});


export const UserModel = model('User', userSchema);
