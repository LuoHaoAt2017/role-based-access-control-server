"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var router_1 = __importDefault(require("./router"));
var req_record_1 = __importDefault(require("./middleware/req-record"));
var app = (0, express_1.default)();
// 虚拟路径前缀
app.use('/static', express_1.default.static('./src/assets'));
// 解析 form 参数
app.use(body_parser_1.default.urlencoded({ extended: false }));
// 自定义中间件 统计请求。
app.use(req_record_1.default);
// 中间件
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['rbac'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// 注册路由
app.use(router_1.default);
// 指定端口
app.listen(7001, function () {
    console.log('server listen on 7001');
});
exports.default = app;
