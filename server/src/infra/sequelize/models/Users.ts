import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface UsersAttributes {
  id: number
  email: string
  name: string
  created_at?: Date
  updated_at?: Date
  deleted_at: Date
}
export type UsersPk = "id";
export type UsersId = Users[UsersPk];

export type UsersOptionalAttributes =
  | "id"
  | "email"
  | "name";

export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number
  email: string
  name: string
  created_at?: Date
  updated_at?: Date
  deleted_at: Date


  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true
        }
      }, {
      sequelize,
      tableName: "user",
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "idx_email",
          using: "BTREE",
          fields: [{ name: "username" }],
        }
      ]
    })
  }
}

