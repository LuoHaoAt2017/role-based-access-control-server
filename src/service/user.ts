import { User } from '../model/user';
/**
 * 检查用户名是否存在重复
 */
export async function checkUserName(username: string): Promise<boolean> {
  try {
    const data = await User.findAll({
      where: {
        username: username
      }
    });
    return data.length > 0;
   } catch(err) {
     return false;
   }
}

/**
 * 注册
 */
export async function registerUser(username: string, password: string): Promise<any | Error> {
  try {
    console.log('username: ', username, ' password: ', password);
    const data = await User.create({
      username: username,
      password: password
    });
    return data;
   } catch(err) {
    return err;
   }
}

/**
 * 注册
 */
 export async function getAllUsers() {
   try {
    return await User.findAll();
   } catch(err) {
    return err;
   }
}