export class Account {
  private state: State;
  public title: string;

  constructor(title: string) {
    this.state = new Novice(0);
    this.title = title;
  }

  public reply(message: string) {
    this.state.reply(this, message);
  }

  public publish(message: string) {
    this.state.publish(this, message);
  }

  public download(file: File) {
    this.state.download(this, file);
  }

  public setState(state) {
    this.state = state;
  }

  public getState(): State {
    return this.state;
  }

  public getScore(): number {
    return this.state.getScore();
  }
}

export abstract class State {

  protected score: number = 0;

  protected reward: number = 50;

  constructor(score: number) {
    this.score = score;
  }

  public reply(account: Account, message: string) {
    this.score += this.reward;
    console.log(account.title +  ' reply message: ', message);
  }

  public publish(account: Account, message: string) {
    this.score += this.reward;
    console.log(account.title +  ' publish message: ', message);
  }

  public download(account: Account, file: File) {
    console.error(new Error(account.title +  '积分不够，无法下载' + file.title));
  }

  public getScore(): number {
    return this.score;
  }
}

export class Novice extends State {
  public reply(account: Account, message: string) {
    console.log('message: ', message);
    this.score += this.reward;
    if (this.score >= 100) {
      account.setState(new Master(this.score));
    }
  }

  public publish(account: Account, message: string) {
    console.log('message: ', message);
    this.score += this.reward;
    if (this.score >= 100) {
      account.setState(new Master(this.score));
    }
  }
}

export class Master extends State {
  public reply(account: Account, message: string) {
    console.log(account.title +  ' reply message: ', message);
    this.score += this.reward;
    if (this.score >= 1000) {
      account.setState(new Export(this.score));
    }
  }

  public publish(account: Account, message: string) {
    console.log(account.title +  ' publish message: ', message);
    this.score += this.reward * 2;
    if (this.score >= 1000) {
      account.setState(new Export(this.score));
    }
  }

  public download(account: Account, file: File) {
    if (this.score - file.score < 0) {
      console.error(new Error("当前的积分不够"));
    } else {
      this.score -= file.score;
      if (this.score < 100) {
        account.setState(new Novice(this.score));
      }
    }
  }
}

export class Export extends State {
  public publish(account: Account, message: string) {
    this.score += this.reward * 2;
    console.log(account.title +  ' publish message: ', message);
  }

  public download(account: Account,  file: File) {
    if (this.score - file.score / 2 < 0) {
      console.error(new Error("当前的积分不够"));
    } else {
      this.score -= file.score / 2;
      if (this.score < 100) {
        account.setState(new Novice(this.score));
      } else if (this.score < 1000) {
        account.setState(new Master(this.score));
      }
    }
  }
}

export interface File {
  score: number;
  title?: string;
  ext?: string;
  size?: number;
}