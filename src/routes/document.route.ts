/**
 * {{desc}} 
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-03 11:31:32
 * @LastEditTime: 2019-02-03 12:23:10
 */
import * as Router from 'koa-router';
import {DocumentService} from '../server/document.service';

const router = new Router();
const documentService = new DocumentService();

router.post('/list/:collection', async (ctx, next) => {
    ctx.body = await documentService.queryDocumentList(ctx);
}).put('/insert/:collection', async (ctx, next) => {
    ctx.body = await documentService.insertDocument(ctx);
}).post('/delete/:collection', async (ctx, next) => {
    ctx.body = await documentService.deleteByIds(ctx);
}).put('/modify/:collection', async (ctx, next) => {
    ctx.body = await documentService.update(ctx);
});

export const documentRouter = router;