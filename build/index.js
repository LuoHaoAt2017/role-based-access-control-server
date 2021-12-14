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
app.use('/static', express_1.default.static('public'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(req_record_1.default);
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['rbac'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server listen on 9090');
});
exports.default = app;
