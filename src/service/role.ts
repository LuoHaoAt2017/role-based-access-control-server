
import { Role } from "../model/role";

interface IRole {
  role_name: string;
  nick_name: string;
  description: string;
}

async function search(): Promise<any | Error> {
  try {
    return await Role.findAll();
  } catch (err) {
    return err;
  }
}

async function create(params: IRole): Promise<any | Error> {
  try {
    console.log('params: ', params);
    return await Role.create(params);
  } catch (err) {
    return err;
  }
}

async function update(username: string): Promise<any | Error> {
  try {
    const data = await Role.findAll({
      where: {
        username: username,
      },
    });
    return data.length > 0;
  } catch (err) {
    return false;
  }
}

async function remove(username: string): Promise<any | Error> {
  try {
    const data = await Role.findAll({
      where: {
        username: username,
      },
    });
    return data.length > 0;
  } catch (err) {
    return false;
  }
}

export default {
  search,
  create,
  update,
  remove,
};
