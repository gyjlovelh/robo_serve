/**
 * Created by guanyj on  1/10/20
 */

import {Schema, model} from 'mongoose';

const HttpRequestSchema = new Schema({

    // 标识[用于文件命名]
    identify: {
        type: String,
        required: '{PATH} 为必填项！'
    },

    // 接口描述
    desc: {
        type: String,
        required: '{PATH} 为必填项！'
    },

    // 路由
    url: {
        type: String,
        lowercase: true,
        trim: true,
        required: '{PATH} 为必填项！'
    },

    // 所属模块
    module: {
        type: Schema.Types.ObjectId,
        required: '{PATH} 为必填项！',
        ref: 'Module'
    },

    // 版本号
    version: String,

    // 请求方式
    method: {
        type: String,
        default: 'POST'
    },


});

export const HttpRequestModel = model('HttpRequest', HttpRequestSchema);
