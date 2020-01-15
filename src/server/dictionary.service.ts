/**
 * Created by guanyj on  1/15/20
 */
import {CommonCurdService} from "./common-curd.service";
import {DictionaryModel} from "../models/dictionary.model";


export class DictionaryService extends CommonCurdService {
    constructor() {
        super(DictionaryModel);
    }

}
