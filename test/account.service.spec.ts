import { Account, Novice, Master, Export } from '../server/services/Account';

describe("账号状态测试", function() {

  const errorFunc = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = errorFunc;
  });

  test("新手测试", function() {
    try {
      const account = new Account("骆浩");

      account.publish("hello");
      expect(account.getState() instanceof Novice).toBeTruthy();

      account.reply("hello");
      expect(account.getState() instanceof Master).toBeTruthy();

      account.download({score: 100});
      expect(account.getState() instanceof Master).toBeTruthy();
    } catch(error) {
      console.error(error);
    }
  });

  test("高手测试", function() {
    const account = new Account("骆浩");
    account.setState(new Master(100));
    expect(account.getState() instanceof Master).toBeTruthy();
    // jest todo 让某个方法执行多次
    Array.from({length: 9}).forEach(function(){
      account.publish("hello");
    });
    expect(account.getState() instanceof Export).toBeTruthy();
    // 从专家模式降级到高手模式
    account.download({score: 1000});
    expect(account.getState() instanceof Master).toBeTruthy();
    // 高手模式 积分不够
    account.download({score: 1000});
    expect(account.getState() instanceof Master).toBeTruthy();
  });

  test("专家测试", function() {
    const account = new Account("骆浩");
    account.setState(new Export(1000));
    account.download({score: 2000});
    expect(account.getState() instanceof Master).toBeFalsy();
    expect(account.getState() instanceof Novice).toBeTruthy();
  });
});