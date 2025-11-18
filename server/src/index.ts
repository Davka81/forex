require("module-alias/register");
require("source-map-support").install();
require("dotenv").config();

import { loggerFactory } from "@lib/loggerFactory";
import App from "@root/App";

const logger = loggerFactory.createLogger("AppRoot");

const PORT = process.env.PORT || "3000";

const APP = new App();

APP.setup()
  .then((app) => {
    app.listen(PORT, () => {
      logger.info("Express server listening on port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });