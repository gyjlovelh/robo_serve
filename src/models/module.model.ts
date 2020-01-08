/**
 * Created by guanyj on  1/8/20
 */


import {Schema, model} from 'mongoose';

const moduleSchema = new Schema({
    /**
     * 模块名称
     */
    name: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: '{PATH} 为必填项！'
    },

    /**
     * 模块标识
     */
    identify: {
        type: String,
        unique: true,
        required: '{PATH} 为必填项！'
    },

    path: {
        type: String,
        unique: true,
        required: '{PATH} 为必填项！'
    },

    /**
     * 国际化词条
     */
    i18n: {
        type: String,
        unique: true,
        required: '{PATH} 为必填项！'
    },

    /**
     * 前端标识Id
     */
    frontId: {
        type: Number,
        unique: true,
        required: '{PATH} 为必填项'
    },

    /**
     * 权限码Id
     */
    accessId: {
        type: Number,
        unique: true,
        required: '{PATH} 为必填项'
    },

    /**
     * 描述
     */
    desc: String
});

export const ModuleModel = model('Module', moduleSchema);
