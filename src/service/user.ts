import { User } from "../model/user";
import { Role } from "../model/role";
import { Op } from "sequelize";

async function registerUser(
  username: string,
  password: string
): Promise<any | Error> {
  try {
    const data = await User.create({
      username: username,
      password: password,
    });
    return data;
  } catch (err) {
    return err;
  }
}

async function getAllUsers() {
  try {
    return await User.findAll();
  } catch (err) {
    return err;
  }
}

async function getUserWithRole(): Promise<any | Error> {
  try {
    return await User.findAll({
      include: [
        {
          model: Role,
          as: "roles",
        },
      ],
    });
  } catch (err) {
    return err;
  }
}

async function setUserRoles(userId: string, roleIds: string[]): Promise<any | Error> {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return new Error("用户不存在");
    }
    const roles = await Role.findAll({
      where: {
        id: {
          [Op.in]: roleIds
        }
      }
    });
    if (!roles || roles.length == 0) {
      return new Error("角色不存在");
    }
    return await (user as any).setRoles(roles);
  } catch (err) {
    return err;
  }
}

async function getUserByName(name: string): Promise<any | Error> {
  try {
    return await User.findAll({
      where: {
        username: name,
      },
    });
  } catch (err) {
    return err;
  }
}

async function getUserById(id: string): Promise<any | Error> {
  try {
    return await User.findByPk(id);
  } catch (err) {
    return err;
  }
}

export default {
  getUserByName,
  registerUser,
  getAllUsers,
  getUserById,
  getUserWithRole,
  setUserRoles
};
