/**
 * Created by guanyj on  1/8/20
 */

import * as Router from 'koa-router';
import {GridChangeEvent} from "../utils/grid.model";
import {LayoutService} from "../server/layout.service";

const router = new Router();
const layoutService = new LayoutService();

router.post('/list', async (ctx, next) => {
    ctx.body = await layoutService.inject(ctx).queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await layoutService.inject(ctx).addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await layoutService.updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await layoutService.deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await layoutService.inject(ctx).getFullList();
});


export const layoutRouter = router;
