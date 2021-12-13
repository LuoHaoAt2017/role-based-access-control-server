import fs from "fs";
import superagent from "superagent";
import { Analyzer } from './analyzer';

export default class Spider {

  async process(url: string, analyzer: Analyzer) {
    const html = await this.getRawHtml(url);
    return analyzer.analyze(html);
  }

  async getRawHtml(url: string): Promise<string> {
    const res = await superagent.post(url);
    return res.text;
  }

  writeFile(fileContent: string, filePath: string) {
    // write 之前要判断文件是否目录是否存在
    fs.writeFileSync(filePath, fileContent, "utf-8");
  }
}