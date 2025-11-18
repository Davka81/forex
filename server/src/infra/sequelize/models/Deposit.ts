import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface DepositAttributes {
  id: number
  transaction_date: Date;
  type: string;
  method: string;
  amount: number;
  created_at?: Date
  updated_at?: Date
  deleted_at: Date
}
export type DepositPk = "id";
export type DepositId = Deposit[DepositPk];

export type DepositOptionalAttributes =
  | "id"
  | "transaction_date"
  | "type"
  | "method"
  | "amount";

export type DepositCreationAttributes = Optional<DepositAttributes, DepositOptionalAttributes>

export class Deposit extends Model<DepositAttributes, DepositCreationAttributes> implements DepositAttributes {
  id: number
  transaction_date: Date;
  type: string;
  method: string;
  amount: number;
  created_at?: Date
  updated_at?: Date
  deleted_at: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Deposit {
    return Deposit.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      transaction_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      method: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "deposit",
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
        }
      ]
    })
  }
}

