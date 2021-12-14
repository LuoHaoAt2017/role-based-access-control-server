"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_server_renderer_1 = require("vue-server-renderer");
var render = (0, vue_server_renderer_1.createRenderer)();
var app = new vue_1.default({
    template: "<div>Hello World</div>"
});
render.renderToString(app, function (err, html) {
    if (err) {
        throw err;
    }
    console.log(html);
});
