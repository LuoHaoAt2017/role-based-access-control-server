"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var analyzer_1 = require("./analyzer");
var spider_1 = __importDefault(require("./spider"));
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    res.status(200).send("hello world");
});
router.get("/login.html", function (req, res) {
    res.status(200).send("\n    <html>\n      <head>\n        <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css\" rel=\"stylesheet\">\n        <script src=\"https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js\"></script>\n        <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js\"></script>\n        <style type=\"text/css\">\n          form {\n            width: 80%;\n            margin: 200px auto;\n            padding: 50px 100px;\n            border: thin solid #eee;\n            border-radius: 4px;\n          }\n          .form-group {\n            display: flex;\n          }\n          .form-group label {\n            width: 150px;\n          }\n        </style>\n      </head>\n      <body>\n        <form action=\"/login\" method=\"post\" enctype=\"application/x-www-form-urlencoded\">\n          <div class=\"form-group\">\n            <label for=\"username\">\u7528\u6237\u540D</label>\n            <input type=\"text\" class=\"form-control\" name=\"username\" id=\"username\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"password\">\u5BC6\u7801</label>\n            <input type=\"password\" class=\"form-control\" name=\"password\" id=\"password\">\n          </div>\n          <button type=\"submit\" class=\"btn btn-primary\" style=\"width:100%;\">\u63D0\u4EA4</button>\n        </form>\n      </body>\n    </html>\n  ");
});
router.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.status(200).send("username: " + username + " password: " + password);
});
router.get("/sciences-member", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var url, analyzer, spider, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://casad.cas.cn/ysxx2017/ysmdyjj/qtysmd_124280";
                    analyzer = new analyzer_1.SciencesAnalyzer();
                    spider = new spider_1.default();
                    return [4 /*yield*/, spider.process(url, analyzer)];
                case 1:
                    data = _a.sent();
                    res.status(200).send(data);
                    return [2 /*return*/];
            }
        });
    });
});
router.get("/engineer-member", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var url, analyzer, spider, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://www.cae.cn/cae/html/main/col48/column_48_1.html";
                    analyzer = new analyzer_1.EngineerAnalyzer();
                    spider = new spider_1.default();
                    return [4 /*yield*/, spider.process(url, analyzer)];
                case 1:
                    data = _a.sent();
                    res.status(200).send(data);
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
