import { seq } from "@infra/sequelize";
import { SeqDeposit } from "@infra/sequelize/models/init-models";
import { parseAmount } from "@utils/utils";
import { Op } from "sequelize";

export interface DepositRow {
  transaction_date: Date;
  type: string;
  method: string;
  account: string;
  amount: string;
  status: string;
}

export default class DepositQueryService {
  constructor() { }

  public async fetchAll() {
    const data = await SeqDeposit.findAll({
      attributes: ["method", [seq.fn("SUM", seq.col("amount")), "total_amount"]],
      group: ["method"]
    });

    return data;
  }

  public async upload(rows: DepositRow[]): Promise<{ inserted: number, skipped: number }> {
    const approvedRows = rows.filter(r => r.status === "Approved" && r.type === "Deposit");

    if (approvedRows.length === 0) {
      return { inserted: 0, skipped: rows.length };
    }

    const dates = approvedRows.map(r => new Date(r.transaction_date).toISOString());

    // Find existing positions in DB
    const existing = await SeqDeposit.findAll({
      where: { transaction_date: { [Op.in]: dates } },
      attributes: ['transaction_date'],
    });

    const existingDates = new Set(existing.map(r => new Date(r.transaction_date).toISOString()));

    // Filter out duplicates
    const newRows = approvedRows.filter(r => !existingDates.has(new Date(r.transaction_date).toISOString()));

    // Insert only new rows
    if (newRows.length > 0) {
      await SeqDeposit.bulkCreate(newRows.map(r => ({
        transaction_date: r.transaction_date,
        type: r.type,
        method: r.method.replace("Electronic payment (PayPal)", "PayPal"),
        amount: parseAmount(r.amount),
      })));
    }

    return {
      inserted: newRows.length,
      skipped: rows.length - newRows.length,
    };
  }
}