"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkLogin(req, res, next) {
    if (req.session && req.session.isLogged) {
        next();
    }
    else {
        res.redirect("/");
    }
}
exports.default = checkLogin;
