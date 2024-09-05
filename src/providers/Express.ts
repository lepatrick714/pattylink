import express from "express";
import Locals from "./Locals";
import Routes from "./Routes";

import MiddlewareApp from "../middlewares/index";

import ExceptionHandler from "../exception/Handler";

class Express {
  // Static singleton instance
  public static express: express.Application;

  public static getApp() {
    if (!this.express) {
      this.init();
    }
    return this.express;
  }

  /**
   * Mounts all the defined middlewares
   */
  private static mountMiddlewares(): void {
    this.express = MiddlewareApp.init(this.express);
  }

  /**
   * Mounts all the defined routes
   */
  private static mountRoutes(): void {
    this.express = Routes.mountApi(this.express);
    console.log("Routes mounted");
  }

  /**
   * Starts the express server
   */
  public static init(): any {
    this.express = express();

    Express.mountDotEnv();
    Express.mountMiddlewares();
    Express.mountRoutes();

    const port: number = Locals.config().port;
    // Registering Exception / Error Handlers
    this.express.use(ExceptionHandler.logErrors);
    this.express.use(ExceptionHandler.clientErrorHandler);
    this.express.use(ExceptionHandler.errorHandler);
    this.express = ExceptionHandler.notFoundHandler(this.express);

    // Start the server on the specified port
    this.express
      .listen(port, () => {
        return console.log(
          "\x1b[33m%s\x1b[0m",
          `Server :: Running @ 'http://localhost:${port}'`
        );
      })
      .on("error", (_error) => {
        return console.log("Error: ", _error.message);
      });
  }

  private static mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }
}

export default Express.getApp();
