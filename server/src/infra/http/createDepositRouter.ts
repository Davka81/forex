import DepositQueryService from "@application/DepositQueryService";
import DepositService from "@application/DepositService";
import ErrorWithCode from "@lib/error_handling/ErrorWithCode";
import successResponse from "@lib/http_server_utils/successResponse";
import { AdminJWTData } from "@shared/types";
import adminGuard from "@utils/adminGuard";
import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";

class Handler {
  constructor(
    private depositService: DepositService,
    private depositQueryService: DepositQueryService
  ) { }

  @adminGuard
  public async upload(req: Request, res: Response, next: NextFunction, reqAdmin: AdminJWTData) {
    const { error, value } = Joi.array().items(Joi.object({
      transaction_date: Joi.string().required(),
      type: Joi.string().required(),
      method: Joi.string().allow("").required(),
      account: Joi.string().allow("").required(),
      amount: Joi.string().required(),
      status: Joi.string().required()
    })).validate(req.body);

    if (error) throw error;

    try {
      const { inserted, skipped } = await this.depositQueryService.upload(value);
      return successResponse(res, { success: true, inserted, skipped });
    } catch (error) {
      throw new ErrorWithCode(error.code ?? "UPLOAD_FAILED", error.message ?? "Failed to upload data");
    }
  }

  @adminGuard
  public async fetchAll(req: Request, res: Response, next: NextFunction, reqAdmin: AdminJWTData) {
    try {
      const data = await this.depositQueryService.fetchAll();
      return successResponse(res, { success: true, data });
    } catch (error) {
      throw new ErrorWithCode(error.code ?? "UPLOAD_FAILED", error.message ?? "Failed to upload data");
    }
  }

}

export const createDepositRouter = (...params: [DepositService, DepositQueryService]) => {
  const router = Router();
  const handler = new Handler(...params);

  router.get("/all", handler.fetchAll.bind(handler));
  router.post("/upload", handler.upload.bind(handler));

  return router;
}