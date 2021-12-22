import { Model, Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { User } from './user';
import { Role } from './role';
export class UserRole extends Model {}

export default function(sequelize: Sequelize) {
  // Initialize a model, representing a table in the DB, with attributes and options.
  UserRole.init({
    // attributes
    // id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   primaryKey: true,
    //   unique: true,
    //   defaultValue: UUIDV4
    // },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      references: {
        model: User,
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      references: {
        model: Role,
        key: 'id'
      }
    }
  }, {
    // options
    sequelize: sequelize,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  });
  return UserRole;
}