/**
 * Created by guanyj on  1/8/20
 */
import {ModuleModel} from "../models/module.model";
import {CommonCurdService} from "./common-curd.service";

export class ModuleService extends CommonCurdService {

    constructor() {
        super(ModuleModel);
    }



}
