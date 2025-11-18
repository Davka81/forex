import { Sequelize } from "sequelize";

import { Users as _Users } from "./Users";
import { History as _History } from "./History";
import { Deposit as _Deposit } from "./Deposit";

export {
  _Users as SeqUsers,
  _History as SeqHistory,
  _Deposit as SeqDeposit
}

export function initModels(sequelize: Sequelize) {
  const Users = _Users.initModel(sequelize);
  const History = _History.initModel(sequelize);
  const Deposit = _Deposit.initModel(sequelize);

  return {
    Users: Users,
    History: History,
    Deposit: Deposit
  }
}