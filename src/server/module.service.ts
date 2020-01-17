/**
 * Created by guanyj on  1/8/20
 */
import {ModuleModel} from "../models/module.model";
import {CommonCurdService} from "./common-curd.service";
import {GridChangeEvent} from "../utils/grid.model";
import {ResponseResult, ResultUtil, TableResult} from "../utils/result.util";
import {utils} from "../utils/utils";

export class ModuleService extends CommonCurdService {

    constructor() {
        super(ModuleModel);
    }

}
