import moment from "moment";
import { Request, Response, NextFunction } from 'express';

// 记录所有的请求，统计访问频率。
function reqRecord(req: Request, res: Response, next: NextFunction) {
  console.log('request ', moment().format('YYYY-MM-dd hh:mm:ss'));
  next();
}

export default reqRecord;