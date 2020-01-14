/**
 * Created by guanyj on  1/10/20
 */

import * as Router from 'koa-router';
import {GridChangeEvent} from "../utils/grid.model";
import {HttpRequestService} from "../server/http-request.service";

const router = new Router();
const httpRequestService = new HttpRequestService();

router.post('/list', async (ctx, next) => {
    ctx.body = await httpRequestService.queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await httpRequestService.addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await httpRequestService.updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await httpRequestService.deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await httpRequestService.getFullList();
})


export const httpRequestRouter = router;
