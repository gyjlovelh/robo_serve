import * as Router from 'koa-router';
import {GridChangeEvent} from "../utils/grid.model";
import {EnumService} from "../server/enum.service";

const router = new Router();
const enumService = new EnumService();

router.post('/list', async (ctx, next) => {
    ctx.body = await enumService.queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await enumService.addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await enumService.updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await enumService.deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await enumService.getFullList();
})


export const enumRouter = router;
