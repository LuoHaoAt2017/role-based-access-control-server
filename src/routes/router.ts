import Vue from "vue";
import { createRenderer } from "vue-server-renderer";
import { Router, Request, Response } from "express";
import { SciencesAnalyzer, EngineerAnalyzer } from "../utils/analyzer";
import DeptService from "../service/dept";
import UserService from "../service/user";
import RoleService from "../service/role";
import { checkLogin } from "../middleware/login";
import formatResult from "../utils/result";
import Spider from "../utils/spider";

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

router.post("/login", async function (req: CustomRequest, res: Response) {
  // 请求体中预期含有 username 和 password。
  const username = req.body.username;
  const password = req.body.password;
  // console.log('username: ', username, ' password: ', password);
  const resp = await UserService.getUserByName(username);
  if (resp instanceof Error) {
    return res.status(500).send(formatResult(null, resp));
  }
  if (Array.isArray(resp) && resp.length > 0) {
    const user = resp[0];
    if (user.username === username && user.password === password) {
      req.session && (req.session.isLogged = true);
      res.status(200).send(formatResult(user));
    } else {
      res.status(500).send(formatResult(null, "用户名或者密码错误"));
    }
  } else {
    res.status(500).send(formatResult(null, "用户不存在"));
  }
});

router.get("/logout", function (req: Request, res: Response) {
  if (req.session) {
    req.session.isLogged = false;
  }
  res.status(200).send(formatResult("退出成功"));
});

router.post("/register", async function (req: CustomRequest, res: Response) {
  // 请求体中预期含有 username 和 password。
  const username = req.body.username;
  const password = req.body.password;
  const resp = await UserService.getUserByName(username);
  if (resp instanceof Error) {
    return res.status(500).send(formatResult(null, resp));
  }
  if (Array.isArray(resp) && resp.length > 0) {
    return res.status(500).send(formatResult("", "用户名被占用"));
  }
  const data = await UserService.registerUser(username, password);
  if (data instanceof Error) {
    res.status(500).send(formatResult(null, data));
  } else {
    res.status(200).send(formatResult(data));
  }
});

router.get("/GetAllUser", async function (req: Request, res: Response) {
  const data = await UserService.getAllUsers();
  if (data instanceof Error) {
    res.status(500).send(formatResult([], data.message));
  } else {
    res.status(200).send(formatResult(data));
  }
});

router.get("/GetAllUserWithRole", async function (req: Request, res: Response) {
  const data = await UserService.getUserWithRole();
  if (data instanceof Error) {
    res.status(500).send(formatResult(null, data.message));
  } else {
    res.status(200).send(formatResult(data));
  }
});

router.get("/GetUserById", async function (req: Request, res: Response) {
  console.log("query: ", req.query, " param: ", req.params);
  if (req.query && req.query.uid) {
    const userId = req.query.uid as string;
    const data = await UserService.getUserById(userId);
    if (data instanceof Error) {
      res.status(500).send(formatResult(null, data.message));
    } else {
      res.status(200).send(formatResult(data));
    }
  }
});

router.get("/SetUserRoles", async function (req: Request, res: Response) {
  if (!req.query.userId) {
    return res.status(500).send(formatResult(null, "userId 缺失"));
  }
  if (!req.query.roles || req.query.roles.length === 0) {
    return res.status(500).send(formatResult(null, "roles 不为空"));
  }
  const userId = req.query.userId as string;
  const roles = req.query.roles as string[];
  const data = await UserService.setUserRoles(userId, roles);
  if (data instanceof Error) {
    res.status(500).send(formatResult(null, data.message));
  } else {
    res.status(200).send(formatResult(data));
  }
});

router.post("/CreateDepartment", async function (req: Request, res: Response) {
  // console.log('username: ', username, ' password: ', password);
  const data = await DeptService.create({
    dept_name: req.body.dept_name,
    dept_logo: req.body.dept_logo || "",
    description: req.body.description,
  });
  if (data instanceof Error) {
    res.status(500).send(formatResult(null, "新增失败"));
  } else {
    res.status(200).send(formatResult(data));
  }
});

router.get("/SearchDepartment", async function (req: Request, res: Response) {
  const data = await DeptService.search();
  if (data instanceof Error) {
    res.status(500).send(formatResult(null, "查询失败"));
  } else {
    res.status(200).send(formatResult(data));
  }
});

router.post("/CreateRole", async function (req: Request, res: Response) {
  const data = await RoleService.create({
    role_name: req.body.role_name,
    nick_name: req.body.nick_name,
    description: req.body.description,
  });
  if (data instanceof Error) {
    res.status(500).send(formatResult(null, "新增失败"));
  } else {
    res.status(200).send(formatResult(data));
  }
});

router.get("/SearchRole", async function (req: Request, res: Response) {
  const data = await RoleService.search();
  if (data instanceof Error) {
    res.status(500).send(formatResult(null, data));
  } else {
    res.status(200).send(formatResult(data));
  }
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
    const data = await spider.process(url, analyzer);
    res.status(200).send(formatResult(data));
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

router.get(
  "/sciences-member.html",
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
          people: JSON.parse(people),
        };
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

router.get("/login", function (req: Request, res: Response) {
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

router.get("/home", function (req: Request, res: Response) {
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

export default router;
