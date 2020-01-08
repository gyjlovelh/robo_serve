/**
 * Created by guanyj on  1/8/20
 */
import {CommonCurdService} from "./common-curd.service";
import {PageModel} from "../models/page.model";


export class PageService extends CommonCurdService {

    constructor() {
        super(PageModel);
    }
}
