import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
    next();
  })
  .get('/articles', (ctx, next) => {
    ctx.body = 'this is articles';
    next();
  })
  .get('/articles/:id', (ctx, next) => {
    next();
  })
  .delete('/articles/:id', (ctx, next) => {
    next();
  })
  .post('/articles/', (ctx, next) => {
    console.log(ctx.request.body.customer);
    ctx.body = ctx.request.body;
    next();
  })
  .put('/articles/:id', (ctx, next) => {
    next();
  })

app.use(router.routes()).use(router.allowedMethods()).listen(3008);
console.log("serve running in port 3008")