/**
 * {{desc}} 
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-03 11:13:45
 * @LastEditTime: 2019-02-03 12:28:08
 */
import { DbService } from '../db.service';
import { ObjectId, FilterQuery } from 'mongodb';
import { Context } from 'koa';
import { ResultUtil, TableResult } from '../utils/result.util';
import { QueryCondition } from '../models/query-condition.model';

export class DocumentService {

    constructor() {

    }

    /**
     * 查询详情
     * 
     * @param collectionName 
     * @param id 
     */
    async queryDocumentById(collectionName: string, id: string) {
        const db = await DbService.getDatabase();
        return db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    }

    /**
     * 查询全集
     * 
     */
    async queryDocumentList(ctx: Context) {
        const db = await DbService.getDatabase();
        const queryCondition = new QueryCondition(ctx.request.body);

        console.log('headers', ctx.headers);
        
        const list = await db
            .collection(`${ctx.cookies.get('user')}_${ctx.params.collection}`)
            .find(queryCondition.filters)
            .sort(queryCondition.sort)
            .skip(queryCondition.skip)
            .limit(queryCondition.limit)
            .toArray();

        const total = await db
            .collection(`${ctx.cookies.get('user')}_${ctx.params.collection}`)
            .find(queryCondition.filters)
            .count();

        const tr = new TableResult();
        tr.totalCount = total;
        tr.data = list;
        tr.pageNum = queryCondition.current;
        tr.pageSize = queryCondition.pagesize;
        return ResultUtil.success(tr);
    }

    /**
     * 新增文档
     */
    async insertDocument(ctx: Context) {
        const db = await DbService.getDatabase();
        const collection = `${ctx.cookies.get('user')}_${ctx.params.collection}`,
            doc = ctx.request.body;

        try {
            await db.collection(collection).insert(doc);
            return ResultUtil.success();
        } catch (err) {

        }
    }

    /**
     * 更新文档
     */
    async update(ctx: Context) {
        const db = await DbService.getDatabase();
        const params = ctx.request.body as any;
        const set = Object.create({});
        Object.keys(params).filter(key => key !== '_id').forEach(key => {
            set[key] = params[key];
        });

        try {
            const doc = await db.collection(`${ctx.cookies.get('user')}_${ctx.params.collection}`)
                .updateOne({_id: new ObjectId(params._id)}, {$set: set});

                return ResultUtil.success(doc);
        } catch (err) {
            return ResultUtil.error(-1, err);
        }
    }

    /**
     * 删除单条
     */
    async deleteById() {

    }

    /**
     * 批量删除
     */
    async deleteByIds(ctx: Context) {
        const db = await DbService.getDatabase();
        const ids = (<any>ctx.request.body).map((id: string) => new ObjectId(id));
        try {
            await db.collection(`${ctx.cookies.get('user')}_${ctx.params.collection}`)
            .deleteMany({_id: {$in: ids}});
            return ResultUtil.success();
        } catch (err) {
            return ResultUtil.error(-1, '删除失败');
        }   
    }

}
