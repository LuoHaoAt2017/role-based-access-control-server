export const db_dev: DBConfig = {
  database: 'rbac', // 数据库名称
  username: 'root',
  password: 'LuoHao-123',
  dialect: 'mysql', // 采用的数据库方案
  host: 'localhost',
}

export const db_prod: DBConfig = {
  database: 'mysql',
  username: 'luohao',
  password: '123456',
  dialect: 'mysql',
  host: 'localhost',
}