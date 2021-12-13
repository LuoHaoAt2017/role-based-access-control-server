import { Router, Request, Response } from "express";
import { SciencesAnalyzer, EngineerAnalyzer } from "./analyzer";
import Spider from "./spider";

const router = Router();

router.get("/", function (req: Request, res: Response) {
  res.status(200).send("hello world");
});

router.get("/login.html", function (req: Request, res: Response) {
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

router.post("/login", function (req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;
  res.status(200).send("username: " + username + " password: " + password);
});

router.get("/sciences-member", async function (req: Request, res: Response) {
  // 中国科学院全体院士名单
  const url = "http://casad.cas.cn/ysxx2017/ysmdyjj/qtysmd_124280";
  const analyzer = new SciencesAnalyzer();
  // 网络蜘蛛
  const spider = new Spider();
  const data = await spider.process(url, analyzer);
  res.status(200).send(data);
});

router.get("/engineer-member", async function (req: Request, res: Response) {
  // 中国工程院全体院士名单
  const url = "http://www.cae.cn/cae/html/main/col48/column_48_1.html";
  const analyzer = new EngineerAnalyzer();
  // 网络蜘蛛
  const spider = new Spider();
  const data = await spider.process(url, analyzer);
  res.status(200).send(data);
});

export default router;
