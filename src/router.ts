import { Router, Request, Response } from "express";
import { SciencesAnalyzer, EngineerAnalyzer } from "./analyzer";
import Spider from "./spider";

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
  res.status(200).redirect('/');
});

router.get("/home", function (req: Request, res: Response) {
  if (!req.session || !req.session.isLogged) {
    return res.redirect("/");
  }
  res.send(`
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
      </head>
      <body>
        Hello Express
        <a class="btn btn-primary" role="button" style="width:100%;" href="/sciences-member">中国科学院全体院士名单</a>
        <a class="btn btn-info" role="button" style="width:100%;" href="/engineer-member">中国工程院全体院士名单</a>
        <a class="btn btn-warning" role="button" style="width:100%;" href="/logout">退出</a>
      </body>
    </html>
  `);
});

router.get("/sciences-member", async function (req: Request, res: Response) {
  if (!req.session || !req.session.isLogged) {
    return res.redirect("/");
  }
  // 中国科学院全体院士名单
  const url = "http://casad.cas.cn/ysxx2017/ysmdyjj/qtysmd_124280";
  const analyzer = new SciencesAnalyzer();
  // 网络蜘蛛
  const spider = new Spider();
  const data = await spider.process(url, analyzer);
  res.status(200).send(data);
});

router.get("/engineer-member", async function (req: Request, res: Response) {
  if (!req.session || !req.session.isLogged) {
    return res.redirect("/");
  }
  // 中国工程院全体院士名单
  const url = "http://www.cae.cn/cae/html/main/col48/column_48_1.html";
  const analyzer = new EngineerAnalyzer();
  // 网络蜘蛛
  const spider = new Spider();
  const data = await spider.process(url, analyzer);
  res.status(200).send(data);
});

export default router;
