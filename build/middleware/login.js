"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCookieLogin = exports.checkSessionLogin = void 0;
var result_1 = __importDefault(require("../utils/result"));
function checkSessionLogin(req, res, next) {
    if (req.session && req.session.isLogged) {
        next();
    }
    else {
        res.status(401).send((0, result_1.default)("CheckSessionLogin", "没有登录"));
    }
}
exports.checkSessionLogin = checkSessionLogin;
function checkCookieLogin(req, res, next) {
    if (req.cookies.rbac_cookie) {
        next();
    }
    else {
        res.status(401).send((0, result_1.default)(null, "没有登录"));
    }
}
exports.checkCookieLogin = checkCookieLogin;
