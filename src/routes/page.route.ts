/**
 * Created by guanyj on  1/8/20
 */

import * as Router from 'koa-router';
import {GridChangeEvent} from "../utils/grid.model";
import {PageService} from "../server/page.service";
import {LayoutService} from "../server/layout.service";

const router = new Router();
const pageService = new PageService();
const layoutService = new LayoutService();

router.post('/list', async (ctx, next) => {
    ctx.body = await pageService.queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await pageService.addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await pageService.updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await pageService.deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await pageService.getFullList();
}).post('/layout/:id', async (ctx, next) => {
    ctx.body = await layoutService.findByPageId(ctx.params.id);
});


export const pageRouter = router;
