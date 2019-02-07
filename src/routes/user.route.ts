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

const router = new Router();
const userService = new UserService();

router
    .get('/', async (ctx, next) => {
        // ctx.body = await documentService.queryDocumentList(ctx.query.collection, ctx.params);
    })
    .post('/login', async (ctx, next) => {
        const user = await userService.login(<any>ctx.request.body);
       
        ctx.cookies.set('user', user.data.code);
        console.log(user.data.code);
        // console.log(ctx.cookies.get('user'), user.data.code);
        ctx.body = user;
    })
    .put('/register', async (ctx, next) => {
        ctx.body = await userService.register(ctx.request.body);
    });

export const userRouter = router;