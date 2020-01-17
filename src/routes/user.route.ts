
import * as Router from 'koa-router';
import {UserService} from "../server/user.service";

const router = new Router();
const userService = new UserService();

router.post('/register', async (ctx, next) => {
    ctx.body = await userService.register(ctx.request.body);
}).post('/login', async (ctx, next) => {
    ctx.body = await userService.login(ctx);
})

export const userRouter = router;
