import * as Router from 'koa-router';
import {GridChangeEvent} from "../utils/grid.model";
import {ProjectService} from "../server/project.service";

const router = new Router();
const projectService = new ProjectService();

router.post('/list', async (ctx, next) => {
    ctx.body = await projectService.inject(ctx).queryPagingList(ctx.request.body as GridChangeEvent);
}).post('/add', async (ctx, next) => {
    ctx.body = await projectService.inject(ctx).addItem(ctx.request.body);
}).post('/update', async (ctx, next) => {
    ctx.body = await projectService.inject(ctx).updateItem(ctx.request.body);
}).post('/delete', async (ctx, next) => {
    ctx.body = await projectService.inject(ctx).deleteItemById(ctx.query._id);
}).post('/all', async (ctx, next) => {
    ctx.body = await projectService.inject(ctx).getFullList();
})


export const projectRouter = router;
