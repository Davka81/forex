import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";

import { createExpressRouters } from "./infra/http";
import { domainErrHandler } from "./infra/middleware/errorHandlers";
import { setupSequelize } from "./infra/sequelize";
import paramStore from "./lib/paramStore";
import { APP_ENV } from "./utils/constants";
import { cryptoHelper } from "./lib/cryptoHelper";

require("express-async-errors");

export default class App {
  private allowCookie(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
  }

  private initDB = async () => {
    await setupSequelize();
  }

  public async setup(): Promise<express.Express> {
    const app = express();

    // Connect to the DB through ssh tunnel only in the local environment.
    console.log("APP_ENV => ", APP_ENV);
    console.log("App environment =>", APP_ENV);
    console.log("Node env =>", process.env.NODE_ENV);

    paramStore.init({ appName: "forex", env: process.env.NODE_ENV });
    const { jwtSecret } = await paramStore.getParams("credentials");

    // Put the IP in req.ip
    app.set("trust proxy", true);
    // body parser for setting post body
    app.use(express.urlencoded({ limit: "50mb", extended: false }));
    app.use(express.json({ limit: "50mb" }));

    // Cookie
    app.use(cookieParser());

    // CORS setting.
    const origin = APP_ENV == "prod" ? ["https://erp.snd.mn", "http://localhost:4000"] : ["http://localhost:4000"];
    console.log("allowed origin: ", origin);
    app.use(
      cors({
        origin,
        credentials: true,
        optionsSuccessStatus: 200,
        exposedHeaders: ["Set-Cookie", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers"],
      }),
    );

    await this.initDB();

    cryptoHelper.setup({ jwtSecret, bcryptRound: 5 });

    app.use(this.allowCookie);
    app.use(express.static(path.join(__dirname, "/../public")));

    const routers = await createExpressRouters();

    app.use("/", routers);

    // add error handler
    app.use(domainErrHandler);

    return app;
  }
}