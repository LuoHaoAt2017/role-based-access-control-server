import { Router, Request, Response } from "express";
import { SciencesAnalyzer, EngineerAnalyzer } from "./analyzer";
import Spider from "./spider";

const router = Router();

router.get("/", function(req: Request, res: Response) {
  res.status(200).send("hello world");
});

router.get("/sciences-member", async function (req: Request, res: Response) {
  // 中国科学院全体院士名单
  const url = "http://casad.cas.cn/ysxx2017/ysmdyjj/qtysmd_124280";
  const analyzer = new SciencesAnalyzer();
  // 网络蜘蛛
  const spider = new Spider();
  const data = await spider.process(url, analyzer);
  res.status(200).send(data);
});

router.get("/engineer-member", async function (req: Request, res: Response) {
  // 中国工程院全体院士名单
  const url = "http://www.cae.cn/cae/html/main/col48/column_48_1.html";
  const analyzer = new EngineerAnalyzer();
  // 网络蜘蛛
  const spider = new Spider();
  const data = await spider.process(url, analyzer);
  res.status(200).send(data);
});

export default router;
