import { Department } from "../model/dept";

interface IDepartment {
  dept_name: string;
  dept_logo: string;
  description: string;
}

async function search(): Promise<any | Error> {
  try {
    return await Department.findAll();
  } catch (err) {
    return err;
  }
}

async function create(params: IDepartment): Promise<any | Error> {
  try {
    return await Department.create(params);
  } catch (err) {
    return err;
  }
}

async function update(username: string): Promise<any | Error> {
  try {
    const data = await Department.findAll({
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
    const data = await Department.findAll({
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
