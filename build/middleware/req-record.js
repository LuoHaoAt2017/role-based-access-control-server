"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 记录所有的请求，统计访问频率。
function reqRecord(req, res, next) {
    next();
}
exports.default = reqRecord;
