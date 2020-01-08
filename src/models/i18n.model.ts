/**
 * Created by guanyj on  1/7/20
 */
import {Schema, model} from 'mongoose';

const i18nSchema = new Schema({
    field: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: '{PATH} 为必填项！'
    },

    zh: {
        type: String,
        unique: true,
        required: '{PATH} 为必填项！'
    },

    en: String
});

export const I18nModel = model('I18n', i18nSchema);
