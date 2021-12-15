"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var router_1 = __importDefault(require("./routes/router"));
var app = (0, express_1.default)();
// 虚拟路径前缀
app.use('/static', express_1.default.static('./src/assets'));
// 解析 form 参数
app.use(body_parser_1.default.urlencoded({ extended: false }));
// 解析 json 参数
app.use(body_parser_1.default.json());
// 自定义中间件 统计请求。
// app.use(record);
// 中间件
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['rbac'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// 解决跨域问题
// app.use(cors({
//   origin: '*',
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// }));
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Origin", "http://localhost:8088");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 注册路由
app.use(router_1.default);
// 指定端口
app.listen(7001, function () {
    console.log('server listen on 7001');
});
exports.default = app;
