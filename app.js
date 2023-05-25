import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { ChatGPTAPI } from 'chatgpt'
import { Users } from './users.js'
const app = new Koa();
const router = new Router();
const users = new Users();

const gptAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})

app.use(bodyParser());

router.post('/gpt/chat', async (ctx, next) => {
  const { msg, uid } = ctx.request.body;

  if (!uid) {
    ctx.status = 404
    return
  }
  let user = users.addUser(uid)
  let parentMessageId = user.getChatId() || undefined
  const res = await gptAPI.sendMessage(msg, { parentMessageId })
  user.chatId = res.id
  ctx.body = `${res.text}`;
});

router.post('/gpt/chat/new', async (ctx, next) => {
  const { uid } = ctx.request.body;

  if (!uid) {
    ctx.status = 404
    return
  }
  let user = users.addUser(uid)
  user.newChat()
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(1208, () => {
  console.log('HTTP服务正在监听 1208 端口...');
});