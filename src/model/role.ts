import { Model, Sequelize, DataTypes, UUIDV4 } from "sequelize";

export class Role extends Model {
}

export default function(sequelize: Sequelize) {
  // Initialize a model, representing a table in the DB, with attributes and options.
  Role.init({
    // attributes
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    introduction: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    // options
    sequelize: sequelize,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  });
  return Role;
}

// // 吏部尚书
// export class OfficialMinister extends Role {

// }

// // 户部尚书
// export class PopulationMinister extends Role {

// }

// // 礼部尚书
// export class EducationMinister extends Role {

// }

// // 兵部尚书
// export class DefenseSecretary extends Role {

// }

// // 刑部尚书
// export class CriminalMinister extends Role {

// }

// // 工部尚书
// export class EngineerMinister extends Role {

// }