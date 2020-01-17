/**
 * Created by guanyj on  1/7/20
 */
import * as Router from 'koa-router';
import { I18nService } from '../server/i18n.service';
import {GridChangeEvent} from "../utils/grid.model";

const router = new Router();
const i18nService = new I18nService();

router.post('/list', async (ctx, next) => {
    ctx.body = await i18nService.inject(ctx).queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await i18nService.inject(ctx).addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await i18nService.updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await i18nService.deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await i18nService.inject(ctx).getFullList();
})


export const i18nRouter = router;
