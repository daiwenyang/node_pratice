import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Articles from './service/Article'

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
    next();
  })
  .get('/articles',async (ctx, next) => {
    const result = await Articles.all();
    ctx.body = result;
    await next();
  })
  .get('/articles/:id', async(ctx, next) => {
    const {id} = ctx.params;
    const result = await Articles.find(id);
    ctx.body = result;
    await next();
  })
  .delete('/articles/:id', async(ctx, next) => {
    const {id} = ctx.params;
    const result = await Articles.delete(id);
    ctx.body = "success";
    await next();
  })
  .post('/articles/', async (ctx, next) => {
    const {title,content}=ctx.request.body;
    await Articles.create({
      title,
      content,
    });
    ctx.body = "success";
    await next();
  })
  .put('/articles/:id', async(ctx, next) => {
    const {title,content}=ctx.request.body;
    const {id} = ctx.params;
    await Articles.update({
      id,
      title,
      content,
    });
    ctx.body = "success";
    await next();
  })

app.use(router.routes()).use(router.allowedMethods()).listen(3008);
console.log("serve running in port 3008");