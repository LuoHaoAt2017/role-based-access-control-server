import cheerio from "cheerio";

interface Person {
  name: string;
  href: string;
}

export interface Analyzer {
  analyze: (html: string) => string;
}

// 中国科学院
export class SciencesAnalyzer implements Analyzer {
  getExpertData(html: string): Person[] {
    const list: Person[] = [];
    const $ = cheerio.load(html);
    const items = $("#allNameBar").find("dd span a");
    items.each(function (index, item) {
      const name = $(item).text();
      const info = $(item).attr("href") || "";
      list.push({
        name: name,
        href: info,
      });
    });
    return list;
  }

  analyze(html: string): string {
    const data = this.getExpertData(html);
    return JSON.stringify(data);
  }
}

// 中国工程院
export class EngineerAnalyzer implements Analyzer {
  analyze(html: string) {
    const data = this.getExpertData(html);
    return JSON.stringify(data);
  }

  getExpertData(html: string): Person[] {
    const list: Person[] = [];
    const $ = cheerio.load(html);
    const items = $(".right_md_ysmd").find("li.name_list a");
    items.each(function (index, item) {
      const name = $(item).text();
      const info = $(item).attr("href") || "";
      list.push({
        name: name,
        href: info,
      });
    });
    return list;
  }
}