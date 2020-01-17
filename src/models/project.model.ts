/**
 * Created by guanyj on  1/16/20
 */
import {Schema, model} from 'mongoose';

const projectSchema = new Schema({
    identify: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: '{PATH} 为必填项！'
    },

    name: {
        type: String,
        unique: true,
        required: '{PATH} 为必填项！'
    },

    desc: String,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    },
    versionKey: false
});


export const ProjectModel = model('Project', projectSchema);
