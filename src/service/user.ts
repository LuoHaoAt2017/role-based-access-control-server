import Models from '../model/index';

/**
 * 检查用户名是否存在重复
 */
export async function checkUserName(username: string): Promise<boolean> {
  const data = await Models.User.findAll({
    where: {
      username: username
    }
  });
  return data.length > 0;
}

/**
 * 注册
 */
export async function registerUser(username: string, password: string) {
  const data = await Models.User.create({
    username: username,
    password: password
  });
  return data;
}