/**
 * Created by guanyj on  1/8/20
 */
import {CommonCurdInterface} from "./common-curd.interface";
import {GridChangeEvent} from "../utils/grid.model";
import {utils} from "../utils/utils";
import {ResultUtil, TableResult} from "../utils/result.util";
import {Model} from "mongoose";


export class CommonCurdService implements CommonCurdInterface {

    private ctx: any;

    get context(): any {
        return this.ctx;
    }

    get userId() {
        return this.ctx.header.user;
    }

    get projectId() {
        return this.ctx.header.project;
    }

    constructor(public model: Model<any>) {}

    public inject(ctx: any): CommonCurdService {
        this.ctx = ctx;
        return this;
    }

    /**
     * 查询国际化配置列表的
     * @param params
     */
    async queryPagingList(params: GridChangeEvent) {
        try {
            const list: any = await this.model
                .find({project: this.projectId})
                .find(utils.resolveGridFilters(params.filters))
                .sort(utils.resolveGridSort(params.sort))
                .skip(params.pager.pageSize * (params.pager.pageNo - 1))
                .limit(params.pager.pageSize);
            const totalCount = await this.model.count({project: this.projectId});
            if (list) {
                const result = new TableResult();
                result.records = list;
                result.totalCount = totalCount;
                return ResultUtil.success(result);
            } else {
                return ResultUtil.error(-1, '系统错误');
            }
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

    /**
     * 获取所有国际化词条数据
     */
    async getFullList() {
        try {
            const list = await this.model.find({project: this.projectId});
            return ResultUtil.success(list);
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

    /**
     * 由Id查详情
     * @param id
     */
    async findItemById(id: any) {
        try {
            const item = await this.model.findById(id);
            return ResultUtil.success(item);
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

    /**
     * 新增国际化信息
     * @param model
     */
    async addItem(model: any) {
        try {
            model.project = this.projectId;
            await this.model.create(model);
            return ResultUtil.success();
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

    /**
     * 修改国际化词条信息
     * @param model
     */
    async updateItem(model: any) {
        try {
            await this.model.findByIdAndUpdate(model._id, model);
            return ResultUtil.success();
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

    /**
     * 删除词条
     * @param _id
     */
    async deleteItemById(_id: any) {
        try {
            await this.model.findByIdAndRemove(_id);
            return ResultUtil.success();
        } catch (err) {
            console.error(err);
            return ResultUtil.error(500, '系统错误');
        }
    }

}
