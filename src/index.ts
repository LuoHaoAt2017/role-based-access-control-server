import express from "express";
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import router from './routes/router';
import reqRecord from './middleware/req-record';

const app = express();
// 虚拟路径前缀
app.use('/static', express.static('./src/assets'));
// 解析 form 参数
app.use(bodyParser.urlencoded({ extended: false }));
// 自定义中间件 统计请求。
app.use(reqRecord);
// 中间件
app.use(cookieSession({
  name: 'session',
  keys: ['rbac'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
})); // https://www.youtube.com/watch?v=lNQAl71Abqc
// 注册路由
app.use(router);
// 指定端口
app.listen(7001, function() {
  console.log('server listen on 7001');
});

export default app;