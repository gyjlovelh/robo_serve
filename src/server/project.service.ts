import {CommonCurdService} from "./common-curd.service";
import {ProjectModel} from "../models/project.model";
import {ResponseResult, ResultUtil} from "../utils/result.util";

/**
 * Created by guanyj on  1/16/20
 */
export class ProjectService extends CommonCurdService {

    constructor() {
        super(ProjectModel);
    }

    async getFullList(): Promise<ResponseResult<any>> {
        try {

            const list = await this.model.find({user: this.context.header.user});
            return ResultUtil.success(list);
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

    async addItem(model: any): Promise<ResponseResult<any>> {
        model.user = this.context.header.user;
        return super.addItem(model);
    }
}
