/**
 * {{desc}} 
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-03 11:13:45
 * @LastEditTime: 2019-02-03 12:28:08
 */
import { DbService } from '../db.service';
import { ObjectId } from 'mongodb';
import { Context } from 'koa';
import { ResultUtil } from '../utils/result.util';

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
        const queryCondition = ctx.request.body as any;
        const list = await db
            .collection(ctx.params.collection)
            .find()
            .sort({ [queryCondition.sort]: 1 })
            .skip(Number(queryCondition.skip))
            .limit(Number(queryCondition.limit))
            .toArray();

        return {
            success: true,
            data: list,
            code: 0
        };
    }

    /**
     * 新增文档
     */
    async insertDocument(ctx: Context) {
        const db = await DbService.getDatabase();
        const collection: any = `${ctx.cookies.get('user')}_${ctx.params.collection}`,
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
    async update() {

    }

    /**
     * 删除单条
     */
    async deleteById() {

    }

    /**
     * 批量删除
     */
    async deleteByIds() {

    }

}
