import {GridChangeEvent} from "../utils/grid.model";
import * as Router from 'koa-router';
import {DictionaryService} from "../server/dictionary.service";

const router = new Router();
const dictionaryService = new DictionaryService();

router.post('/list', async (ctx, next) => {
    ctx.body = await dictionaryService.queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await dictionaryService.addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await dictionaryService.updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await dictionaryService.deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await dictionaryService.getFullList();
})


export const dictionaryRouter = router;
