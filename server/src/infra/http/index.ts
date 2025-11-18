import { Router } from "express";

import UserQueryService from "@application/UserQueryService";
import UserService from "@application/UserService";
import { loggerFactory } from "../../lib/loggerFactory";
import { createAuthRouter } from "./createAuthRouter";

import HistoryQueryService from "@application/HistoryQueryService";
import HistoryService from "@application/HistoryService";
import Google from "@lib/google";
import { createHistoryRouter } from "./createHistoryRouter";
import DepositService from "@application/DepositService";
import DepositQueryService from "@application/DepositQueryService";
import { createDepositRouter } from "./createDepositRouter";

const logger = loggerFactory.createLogger("Router");

export const createExpressRouters = async () => {
  const google = new Google();

  const userService = new UserService(google);
  const depositService = new DepositService();
  const historyService = new HistoryService();

  const userQueryService = new UserQueryService();
  const depositQueryService = new DepositQueryService();
  const historyQueryService = new HistoryQueryService();

  const expressRouter = Router();

  expressRouter.use((req, res, next) => {
    console.log(`Http Request URL: ${req.method}:${req.url} from ${req.ip}`);
    console.log("Request details: ", {
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
    });
    next();
  });

  expressRouter.get("", (req, res, next) => {
    return res.send("This is API server");
  });

  expressRouter.use((req, res, next) => {
    logger.info(`Http Request URL: ${req.url} from ${req.ip}`);
    next();
  });

  expressRouter.use("/v1/auth", createAuthRouter(userService, userQueryService));
  expressRouter.use("/v1/history", createHistoryRouter(historyService, historyQueryService));
  expressRouter.use("/v1/deposit", createDepositRouter(depositService, depositQueryService));

  return expressRouter;
}