"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
function main() {
    var app = (0, express_1.default)();
    app.listen(9090, 'localhost', function () {
        console.log('server listen on 9090');
    });
}
main();
