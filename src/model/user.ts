import { Model, Sequelize, DataTypes, UUIDV4 } from "sequelize";

export class User extends Model {}

export default function(sequelize: Sequelize) {
  
  // Initialize a model, representing a table in the DB, with attributes and options.
  User.init({
    // attributes
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    // options
    sequelize: sequelize,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  });
  return User;
}