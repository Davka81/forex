import { NextFunction, Request, Response, Router } from "express";


import HistoryQueryService from "@application/HistoryQueryService";
import HistoryService from "@application/HistoryService";
import adminGuard from "@utils/adminGuard";
import Joi, { symbol } from "joi";
import successResponse from "@lib/http_server_utils/successResponse";
import { AdminJWTData } from "@shared/types";
import ErrorWithCode from "@lib/error_handling/ErrorWithCode";

class Handler {
  constructor(
    private historyService: HistoryService,
    private historyQueryService: HistoryQueryService
  ) { }

  @adminGuard
  public async upload(req: Request, res: Response, next: NextFunction, reqAdmin: AdminJWTData) {
    const { error, value } = Joi.array().items(Joi.object({
      symbol: Joi.string().required(),
      position: Joi.string().required(),
      type: Joi.string().required(),
      volume: Joi.number().required(),
      open_price: Joi.number().required(),
      close_price: Joi.number().required(),
      profit: Joi.number().required(),
      open_time: Joi.date().required(),
      close_time: Joi.date().required(),
    })).validate(req.body);

    if (error) throw error;

    try {
      const { inserted, skipped } = await this.historyQueryService.upload(value);
      return successResponse(res, { success: true, inserted, skipped });
    } catch (error) {
      throw new ErrorWithCode(error.code ?? "UPLOAD_FAILED", error.message ?? "Failed to upload data");
    }
  }

}

export const createHistoryRouter = (...params: [HistoryService, HistoryQueryService]) => {
  const router = Router();
  const handler = new Handler(...params);

  router.post("/upload", handler.upload.bind(handler));

  return router;
}