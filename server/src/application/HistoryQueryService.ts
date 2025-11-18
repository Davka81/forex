import { SeqHistory } from "@infra/sequelize/models/init-models";
import { Op } from "sequelize";

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
}