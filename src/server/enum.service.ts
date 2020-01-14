/**
 * Created by guanyj on  1/14/20
 */
import {CommonCurdService} from "./common-curd.service";
import {EnumModel} from "../models/enum.model";


export class EnumService extends CommonCurdService {
    constructor() {
        super(EnumModel);
    }

}
