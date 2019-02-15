/**
 * {{desc}} 
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-03 11:31:32
 * @LastEditTime: 2019-02-03 12:23:10
 */
import * as Router from 'koa-router';
import { UserService } from '../server/user.service';
import { ResultUtil } from '../utils/result.util';

const router = new Router();
const userService = new UserService();

router
    .get('/', async (ctx, next) => {
        // ctx.body = await documentService.queryDocumentList(ctx.query.collection, ctx.params);
    })
    .post('/login', async (ctx, next) => {
        const user = await userService.login(<any>ctx.request.body);
        ctx.cookies.set('user', user.data.code, 
            { maxAge: 2 * 60 * 60 * 1000, httpOnly: false, }
        );
        ctx.body = user;
    })
    .post('/logout', async (ctx, next) => {
        ctx.cookies.set('user', '', {maxAge: 0, httpOnly: false});
        ctx.body = ResultUtil.success('');
    })
    .put('/register', async (ctx, next) => {
        ctx.body = await userService.register(ctx.request.body);
    });

export const userRouter = router;