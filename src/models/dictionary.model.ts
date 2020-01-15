/**
 * Created by guanyj on  1/15/20
 */


import {Schema, model} from 'mongoose';

const DictionarySchema = new Schema({
    identify: {
        type: String,
        required: '{PATH} 为必填项！',
        unique: true,
    },

    desc: {
        type: String
    },

    code: {
        type: String,
        required: '{PATH} 为必填项！',
    }
});


export const DictionaryModel = model('Dictionary', DictionarySchema);
