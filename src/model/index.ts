import { Sequelize } from 'sequelize';
import { database as config } from '../config/index';
import UserFactory from './user';
import RoleFactory from './role';
import UserRoleFactory from './user_role';
import DepartmentFactory from './dept';
import MinisterFactory from './minister';

const models: any = {}; // eslint-disable-line

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: console.log,
  define: {
    freezeTableName: true, // 停止 Sequelize 执行自动复数化。 Sequelize 将推断表名称等于模型名称,而无需进行任何修改。
  }
});

const User = UserFactory(sequelize);
const Role = RoleFactory(sequelize);
const UserRole = UserRoleFactory(sequelize);
const Department = DepartmentFactory(sequelize);
const Minister = MinisterFactory(sequelize);
User.belongsToMany(Role, {
  through: UserRole,
  as: 'roles'
});
Role.belongsToMany(User, {
  through: UserRole,
  as: 'users'
});

Department.hasOne(Minister, {
  foreignKey: 'department_id'
}); // 一个部门只能有一位部长
Minister.belongsTo(Department); // 一位部长只能属于一个部门

models[User.name] = User;
models[Role.name] = Role;
models[UserRole.name] = UserRole;
models[Department.name] = Department;
models[Minister.name] = Minister;

async function connect() {
  try {
    // 测试连接
    await sequelize.authenticate();
    // 一次同步所有模型
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connect;