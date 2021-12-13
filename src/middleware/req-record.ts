import { Request, Response, NextFunction } from 'express';

// 记录所有的请求，统计访问频率。
function reqRecord(req: Request, res: Response, next: NextFunction) {
  next();
}

export default reqRecord;