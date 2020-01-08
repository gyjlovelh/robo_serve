/**
 * Created by guanyj on  1/7/20
 */
import {I18nModel} from '../models/i18n.model';
import {CommonCurdService} from "./common-curd.service";

export class I18nService extends CommonCurdService {

    constructor() {
        super(I18nModel)
    }
}
