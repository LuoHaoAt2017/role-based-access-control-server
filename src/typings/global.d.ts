declare global {
  namespace NodeJS {
    interface Global {
      env: string; // 失效
    }
  }
}