/**
 * Created by guanyj on  1/15/20
 */


import {Schema, model} from 'mongoose';

const DictionarySchema = new Schema({
    /**
     * 所属项目
     */
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },

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
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    },
    versionKey: false
});


export const DictionaryModel = model('Dictionary', DictionarySchema);
