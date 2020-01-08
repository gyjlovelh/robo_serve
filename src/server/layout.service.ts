/**
 * Created by guanyj on  1/8/20
 */
import {LayoutModel} from "../models/layout.model";
import {CommonCurdService} from "./common-curd.service";
import {ResultUtil} from "../utils/result.util";

export class LayoutService extends CommonCurdService {

    constructor() {
        super(LayoutModel)
    }

    /**
     * 查询页面的布局详情
     * @param id
     */
    async findByPageId(id: any) {
        try {
            const data = await LayoutModel.findOne({
                page: { $eq: id }
            });
            return ResultUtil.success(data);
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

}
