import { Model, Sequelize, DataTypes, UUIDV4 } from "sequelize";

export class Minister extends Model {}

export default function(sequelize: Sequelize) {
  // Initialize a model, representing a table in the DB, with attributes and options.
  Minister.init({
    // attributes
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4
    },
    official_avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    official_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    // options
    sequelize: sequelize,
    modelName: 'Minister',
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  });
  return Minister;
}