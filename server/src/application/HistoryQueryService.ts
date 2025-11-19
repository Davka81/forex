import { seq } from "@infra/sequelize";
import { SeqHistory } from "@infra/sequelize/models/init-models";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { literal, Op, Sequelize } from "sequelize";

dayjs.extend(isoWeek);

export interface HistoryRow {
  symbol: string;
  position: string;
  type: string;
  volume: number;
  open_price: number;
  close_price: number;
  open_time: Date;
  close_time: Date;
}

export default class HistoryQueryService {
  constructor() { }

  public async upload(rows: HistoryRow[]): Promise<{ inserted: number, skipped: number }> {
    const positions = rows.map(r => r.position);

    // Find existing positions in DB
    const existing = await SeqHistory.findAll({
      where: { position: { [Op.in]: positions } },
      attributes: ['position'],
    });

    const existingPositions = new Set(existing.map(r => r.position));

    // Filter out duplicates
    const newRows = rows.filter(r => !existingPositions.has(r.position));

    // Insert only new rows
    if (newRows.length > 0) {
      await SeqHistory.bulkCreate(newRows);
    }

    return {
      inserted: newRows.length,
      skipped: rows.length - newRows.length,
    };
  }

  public async weekProfit() {
    // const monday = dayjs().isoWeekday(1).toDate();
    const monday = dayjs("2025-10-15").toDate();
    // const today = dayjs().startOf("day");
    const today = dayjs("2025-10-21").toDate();

    const result = await SeqHistory.findAll({
      attributes: [
        [seq.fn("DATE", seq.col("close_time")), "day"],
        [SeqHistory.sequelize!.fn("SUM", SeqHistory.sequelize!.col("profit")), "profit"]
      ],
      where: {
        close_time: {
          [Op.between]: [monday, today]
        }
      },
      group: [seq.fn("DATE", seq.col("close_time"))],
      order: [seq.fn("DATE", seq.col("close_time"))],
    });

    return result;
  }
}