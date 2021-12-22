import { Model, Sequelize, DataTypes, UUIDV4 } from "sequelize";
// 组织部门 https://zh.wikipedia.org/zh-cn/%E5%94%90%E6%9C%9D#%E4%B8%89%E7%9C%81%E5%85%AD%E9%83%A8%E5%88%B6

enum DeptType {
  Official = 1,
  Population = 2,
  Etiquette = 3,
  Defense = 4,
  Criminal = 5,
  Engineer = 6
}

export class Department extends Model {

}

export default function(sequelize: Sequelize) {
  // Initialize a model, representing a table in the DB, with attributes and options.
  Department.init({
    // attributes
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4
    },
    dept_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dept_logo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    dept_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    // options
    sequelize: sequelize,
    modelName: 'Department',
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  });
  return Department;
}

// // 吏部
// export class OfficialDepartment extends Department {

// }

// // 户部
// export class PopulationDepartment extends Department {

// }

// // 礼部
// export class EducationDepartment extends Department {

// }

// // 兵部
// export class DefenseDepartment extends Department {

// }

// // 刑部
// export class CriminalDepartment extends Department {

// }

// // 工部
// export class EngineerDepartment extends Department {

// }