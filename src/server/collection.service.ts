
import { DbService } from '../db.service';
import { Context } from 'koa';
import { ResultUtil } from '../utils/result.util';

export class CollectionService {

    constructor() {

    }

    /**
     * 创建集合
     * 
     * @param cName 
     * @param options 
     */
    async createCollection(ctx: Context) {
        const db = await DbService.getDatabase();
        const body = ctx.request.body as any;
        const token = ctx.cookies.get('user');
        const user = await db.collection('user').findOne({code: token});
        console.log(ctx, token, user);
        if (user) {
            const cName: string = body.collection,
                config = JSON.stringify(body.config);
            if (user.collections[`${user.code}_${cName}`]) {
                return ResultUtil.error(-1, '名称重复');
            }
            user.collections[`${user.code}_${cName}`] = config;
            await db.collection('user').update({code: ctx.cookies.get('user')}, {$set: {collections: user.collections}});
            return ResultUtil.success();
        } else {
            return ResultUtil.error(-1, '未登录');
        }
    }

    /**
     * 查询Collection配置
     * 
     * @param ctx 
     */
    async queryCollectionConfig(ctx: Context) {
        const db = await DbService.getDatabase();
        const user = await db.collection('user').findOne({code: ctx.cookies.get('user')});

        if (user) {
            const config = user.collections[`${user.code}_${ctx.params.name}`];
            
            return ResultUtil.success(JSON.parse(config));
        } else {
            return ResultUtil.error(-1, '未登录');
        }
    }

    /**
     * 删除集合
     * 
     * @param cName 
     */
    async deleteCollection(cName: string) {
        const db = await DbService.getDatabase();
        db.collection(cName).drop();
    }
}
