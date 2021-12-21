import express from "express";
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import router from './routes/router';
import record from './middleware/record';
import connect from './model/index';
(async function server() {
  // 链接数据库
  await connect();
  const app = express();
  // 虚拟路径前缀
  app.use('/static', express.static('./src/assets'));
  // 解析 form 参数
  app.use(bodyParser.urlencoded({ extended: false }));
  // 解析 json 参数
  app.use(bodyParser.json());
  // 自定义中间件 统计请求。
  app.use(record);
  // 中间件
  app.use(cookieSession({
    name: 'js_session_id',
    keys: ['rbac'],
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));
  
  //设置跨域访问
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Custom-Timestrap");
    res.header("Access-Control-Allow-Origin", "http://localhost:8088");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  // 注册路由
  app.use(router);
  // 指定端口
  app.listen(7001, function() {
    console.log('server listen on 7001');
  });
})();
