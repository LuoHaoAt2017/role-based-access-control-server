import { createRenderer } from "vue-server-renderer";
import { Request, Response } from "express";
import Vue from "vue";

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

function errorHandler(req: Request, res: Response) {
  const app = new Vue({
    template: `
      <section>
        请求不存在
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

export {
  errorHandler
}