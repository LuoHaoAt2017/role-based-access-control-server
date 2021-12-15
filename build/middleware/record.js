"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
// 记录所有的请求，统计访问频率。
function reqRecord(req, res, next) {
    console.log('request ', (0, moment_1.default)().format('YYYY-MM-dd hh:mm:ss'));
    next();
}
exports.default = reqRecord;
