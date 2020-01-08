/**
 * Created by guanyj on  1/8/20
 */

import * as Router from 'koa-router';
import {GridChangeEvent} from "../utils/grid.model";
import {ModuleService} from "../server/module.service";

const router = new Router();
const moduleService = new ModuleService();

router.post('/list', async (ctx, next) => {
    ctx.body = await moduleService.queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await moduleService.addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await moduleService.updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await moduleService.deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await moduleService.getFullList();
})


export const moduleRouter = router;
