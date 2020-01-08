/**
 * Created by guanyj on  2018/10/11
 */
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as koaStatic from 'koa-static';
import { api } from './routes/api';
import * as mongoose from 'mongoose';
import {environment} from "./environments/environment";
const app = new Koa();
const port = 3000;

app.use(bodyParser());
app.use(koaStatic(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`【${ctx.method}】 ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});


// 连接数据库
(async () => await mongoose.connect(`${environment.mongodbUrl}/${environment.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}))();

/**
 * async 让方法变成异步
 * await 等待异步方法执行完成
 */
app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.body = 'this is 404 page'
    }
});

// error
app.on('error', err => {
    console.error('server error', err)
});

/** 使用路由中间件 */
app.use(api.routes());

/** 监听端口 */
app.listen(port);

console.warn(`[Server] <<<< music_koa listen on port: ${port} >>>>`);
