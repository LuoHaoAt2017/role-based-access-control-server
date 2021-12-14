import Vue from "vue";
import { createRenderer } from "vue-server-renderer";
import { Router, Request, Response } from "express";
import { SciencesAnalyzer, EngineerAnalyzer } from "../utils/analyzer";
import checkLogin from "../middleware/check-login";
import Spider from "../utils/spider";
import formatResult from "../utils/result";
const render = createRenderer({
  // 为整个页面的 HTML 提供一个模板。此模板应包含注释 <!--vue-ssr-outlet-->，作为渲染应用程序内容的占位符。
  template: `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        <title>RBAC</title>
      </head>
      <body>
        <!-- 这里将是应用程序 HTML 标记注入的地方。 -->
        <!--vue-ssr-outlet-->
      </body>
    </html>
    `,
});
// 重写 Request.ReqBody 的类型
interface CustomRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

const router = Router();

router.get("/", function (req: Request, res: Response) {
  if (req.session && req.session.isLogged) {
    return res.redirect("/home");
  }
  // 期望在 req 上添加属性 playcard
  req.playcard = "welcome to world";
  res.status(200).send(`
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        <style type="text/css">
          form {
            width: 80%;
            margin: 200px auto;
            padding: 50px 100px;
            border: thin solid #eee;
            border-radius: 4px;
          }
          .form-group {
            display: flex;
          }
          .form-group label {
            width: 150px;
          }
        </style>
      </head>
      <body>
        <form action="/login" method="post" enctype="application/x-www-form-urlencoded">
          <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" class="form-control" name="username" id="username">
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input type="password" class="form-control" name="password" id="password">
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;">提交</button>
        </form>
      </body>
    </html>
  `);
});

router.post("/login", function (req: CustomRequest, res: Response) {
  // 请求体中预期含有 username 和 password。
  const username = req.body.username;
  const password = req.body.password;
  // global.env = 'luohao';
  if (req.session && req.session.isLogged) {
    return res.redirect("/home");
  } else if (username === "luohao" && password === "123") {
    req.session && (req.session.isLogged = true);
    res.status(200).send(`
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        </head>
        <body>
          <a class="btn btn-success" role="button" style="width:100%;" href="/home">登录成功 前往首页</a>
        </body>
      </html>
    `);
  } else {
    res.status(200).send(`
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        </head>
        <body>
          <a class="btn btn-danger" role="button" style="width:100%;" href="/">登录失败 前往登录页面</a>
        </body>
      </html>
    `);
  }
});

router.get("/logout", function (req: Request, res: Response) {
  if (req.session) {
    req.session.isLogged = false;
  }
  res.status(200).redirect("/");
});

router.get("/home", checkLogin, function (req: Request, res: Response) {
  const app = new Vue({
    template: `
      <div>
        <a class="btn btn-primary" role="button" style="width:100%;" href="/sciences-member">中国科学院全体院士名单</a>
        <a class="btn btn-info" role="button" style="width:100%;" href="/engineer-member">中国工程院全体院士名单</a>
        <a class="btn btn-warning" role="button" style="width:100%;" href="/logout">退出</a>
      </div>
    `,
  });

  render.renderToString(app, function (err, html) {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    res.end(html);
  });
});

router.get(
  "/sciences-member",
  checkLogin,
  async function (req: Request, res: Response) {
    // 中国科学院全体院士名单
    const url = "http://casad.cas.cn/ysxx2017/ysmdyjj/qtysmd_124280";
    const analyzer = new SciencesAnalyzer();
    // 网络蜘蛛
    const spider = new Spider();
    const people = await spider.process(url, analyzer);
    const app = new Vue({
      data() {
        return {
          people: JSON.parse(people)
        }
      },
      template: `
        <section>
          <h3>中国科学院全体院士名单</h3>
          <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in people" :key="index">
              <a :href="item.href" class="list-group-item">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </section>
      `,
    });
    render.renderToString(app, function (err, html) {
      if (err) {
        res.status(500).end("Internal Server Error");
        return;
      }
      res.end(html);
    });
  }
);

router.get(
  "/engineer-member",
  checkLogin,
  async function (req: Request, res: Response) {
    // 中国工程院全体院士名单
    const url = "http://www.cae.cn/cae/html/main/col48/column_48_1.html";
    const analyzer = new EngineerAnalyzer();
    // 网络蜘蛛
    const spider = new Spider();
    const data = await spider.process(url, analyzer);
    res.status(200).send(formatResult(data));
  }
);

export default router;
