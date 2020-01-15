/**
 * Created by guanyj on  1/9/20
 */
import * as Router from 'koa-router';
import {SkeletonService} from "../server/skeleton.service";

const router = new Router();
const skeletonService = new SkeletonService();

router.post('/view/:type', async (ctx, next) => {
    const type = ctx.params.type;
    if (type === 'module') {
        ctx.body = await skeletonService.generateModuleCode((ctx.request.body as any).id);
    } else if (type === 'page') {
        ctx.body = await skeletonService.generateLayoutCode((ctx.request.body as any).id);
    } else if (type === 'framework') {
        ctx.body = await skeletonService.generateFramework();
    }
})


export const skeletonRoute = router;
