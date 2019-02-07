/**
 * {{desc}} 
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-03 12:20:34
 * @LastEditTime: 2019-02-03 12:23:00
 */
import * as Router from 'koa-router';
import {CollectionService} from '../server/collection.service';

const router = new Router();
const collectionService = new CollectionService();

router.post('/create', async (ctx, next) => {
    ctx.body = await collectionService.createCollection(ctx);
})
.get('/config/:name', async (ctx, next) => {
    ctx.body = await collectionService.queryCollectionConfig(ctx);
})

export const collectionRouter = router;