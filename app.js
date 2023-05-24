import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { ChatGPTAPI } from 'chatgpt'

const app = new Koa();
const router = new Router();

const gptAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})

app.use(bodyParser());

router.post('/gpt/chat', async (ctx, next) => {
  const { msg } = ctx.request.body;
  const res = await gptAPI.sendMessage(msg)
  ctx.body = `${res.text}`;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(1208, () => {
  console.log('HTTP服务正在监听 1208 端口...');
});