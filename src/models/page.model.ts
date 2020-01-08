/**
 * Created by guanyj on  1/8/20
 */

import {Schema, model} from 'mongoose';

const pageSchema = new Schema({
    /**
     * 页面名称
     */
    name: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: '{PATH} 为必填项！'
    },

    /**
     * 页面标识
     */
    identify: {
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
    icon: {
        type: String
    },

    /**
     * 父页面
     */
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },

    /**
     * 页面路由
     */
    path: {
        type: String,
        required: '{PATH} 为必填项！'
    },

    /**
     * 所属模块
     */
    module: {
        type: Schema.Types.ObjectId,
        required: '{PATH} 为必填项！',
        ref: 'Module'
    },

    /**
     * 描述
     */
    desc: String
});

export const PageModel = model('Page', pageSchema);
