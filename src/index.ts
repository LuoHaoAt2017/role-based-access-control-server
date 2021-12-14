import express from "express";
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import router from './router';
import reqRecord from './middleware/req-record';

const app = express();
// 虚拟路径前缀
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(reqRecord);
app.use(cookieSession({
  name: 'session',
  keys: ['rbac'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router);

app.listen(7001, function() {
  console.log('server listen on 9090');
});

export default app;