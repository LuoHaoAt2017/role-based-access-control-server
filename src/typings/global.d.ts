declare global {
  namespace NodeJS {
    interface Global {
      env: string; // 失效
    }
  }
}

declare namespace Express {
  interface Request {
    playcard: string;
    app?: any; // eslint-disable-line
  }

  interface Application {
    models?: {
      [string]: Model
    }; // eslint-disable-line
  }
}

interface DBConfig {
  database: string,
  username: string,
  password: string,
  dialect: Dialect, /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  host: string,
}