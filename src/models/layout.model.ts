/**
 * Created by guanyj on  1/8/20
 */

import {Schema, model} from 'mongoose';

const layoutSchema = new Schema({
    /**
     * 布局所属界面
     */
    page: {
        type: Schema.Types.ObjectId,
        required: '{PATH} 为必填项！',
        ref: 'Page'
    },

    /**
     * 模板名称
     */
    template: {
        type: String,
        required: '{PATH} 为必填项！'
    },

    /**
     * 布局配置详细
     */
    content: String
});

export const LayoutModel = model('Layout', layoutSchema);
