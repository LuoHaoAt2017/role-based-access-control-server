import { Request, Response, NextFunction } from 'express';

function checkLogin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isLogged) {
    next();
  } else {
    res.redirect("/");
  }
}

export default checkLogin;