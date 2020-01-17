/**
 * Created by guanyj on  1/14/20
 */



import {Schema, model} from 'mongoose';

const EnumSchema = new Schema({
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

    kvMap: {
        type: Array,
        default: []
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    },
    versionKey: false
});


export const EnumModel = model('Enum', EnumSchema);
