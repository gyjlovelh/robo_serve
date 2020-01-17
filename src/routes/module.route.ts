/**
 * Created by guanyj on  1/8/20
 */

import * as Router from 'koa-router';
import {GridChangeEvent} from "../utils/grid.model";
import {ModuleService} from "../server/module.service";

const router = new Router();
const moduleService = new ModuleService();

router.post('/list', async (ctx, next) => {
    ctx.body = await moduleService.inject(ctx).queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await moduleService.inject(ctx).addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await moduleService.inject(ctx).updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await moduleService.inject(ctx).deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await moduleService.inject(ctx).getFullList();
})


export const moduleRouter = router;
