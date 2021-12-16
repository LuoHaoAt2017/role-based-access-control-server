import { Request, Response, NextFunction } from 'express';
import formatResult from '../utils/result';
function checkLogin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isLogged) {
    next();
  } else {
    res.status(401).send(formatResult("CheckSessionLogin", "没有登录"));
  }
}

export {
  checkLogin,
};