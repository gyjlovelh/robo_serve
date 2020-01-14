/**
 * Created by guanyj on  1/14/20
 */



import {Schema, model} from 'mongoose';

const EnumSchema = new Schema({
    identify: {
        type: String,
        required: '{PATH} 为必填项！',
        unique: true,
    },
    desc: {
        type: String
    },

    kvMap: {
        type: Array,
        default: []
    }
});


export const EnumModel = model('Enum', EnumSchema);
