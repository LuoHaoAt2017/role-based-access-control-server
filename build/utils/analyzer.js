"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineerAnalyzer = exports.SciencesAnalyzer = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
// 中国科学院
var SciencesAnalyzer = /** @class */ (function () {
    function SciencesAnalyzer() {
    }
    SciencesAnalyzer.prototype.getExpertData = function (html) {
        var list = [];
        var $ = cheerio_1.default.load(html);
        var items = $("#allNameBar").find("dd span a");
        items.each(function (index, item) {
            var name = $(item).text();
            var info = $(item).attr("href") || "";
            list.push({
                name: name,
                href: info,
            });
        });
        return list;
    };
    SciencesAnalyzer.prototype.analyze = function (html) {
        var data = this.getExpertData(html);
        return JSON.stringify(data);
    };
    return SciencesAnalyzer;
}());
exports.SciencesAnalyzer = SciencesAnalyzer;
// 中国工程院
var EngineerAnalyzer = /** @class */ (function () {
    function EngineerAnalyzer() {
    }
    EngineerAnalyzer.prototype.analyze = function (html) {
        var data = this.getExpertData(html);
        return JSON.stringify(data);
    };
    EngineerAnalyzer.prototype.getExpertData = function (html) {
        var list = [];
        var $ = cheerio_1.default.load(html);
        var items = $(".right_md_ysmd").find("li.name_list a");
        items.each(function (index, item) {
            var name = $(item).text();
            var info = $(item).attr("href") || "";
            list.push({
                name: name,
                href: info,
            });
        });
        return list;
    };
    return EngineerAnalyzer;
}());
exports.EngineerAnalyzer = EngineerAnalyzer;
