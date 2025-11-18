import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface HistoryAttributes {
  id: number
  symbol: string;
  position: string;
  type: string;
  volume: number;
  open_price: number;
  close_price: number;
  profit: number;
  open_time: Date;
  close_time: Date;
  created_at?: Date
  updated_at?: Date
  deleted_at: Date
}
export type HistoryPk = "id";
export type HistoryId = History[HistoryPk];

export type HistoryOptionalAttributes =
  | "id"
  | "symbol"
  | "position"
  | "type"
  | "volume"
  | "open_price"
  | "close_price"
  | "profit"
  | "open_time"
  | "close_time"
  | "updated_at";

export type HistoryCreationAttributes = Optional<HistoryAttributes, HistoryOptionalAttributes>

export class History extends Model<HistoryAttributes, HistoryCreationAttributes> implements HistoryAttributes {
  id: number
  symbol: string
  position: string
  type: string
  volume: number
  open_price: number
  close_price: number
  profit: number
  open_time: Date
  close_time: Date
  created_at?: Date
  updated_at?: Date
  deleted_at: Date


  static initModel(sequelize: Sequelize.Sequelize): typeof History {
    return History.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      symbol: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      position: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      volume: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false
      },
      open_price: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false
      },
      close_price: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false
      },
      profit: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false
      },
      open_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      close_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "history",
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

