/** Class responsible for loading env configurations */
import { Application } from "express";
import * as path from "path";
import * as dotenv from "dotenv";

export default class Locals {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4040;
    const appSecret = process.env.APP_SECRET || "This is your responsibility!";
    const mongooseUrl = process.env.MONGOOSE_URL;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || "50mb";
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || "50mb";

    const name = process.env.APP_NAME || "NodeTS Dashboard";
    const keywords = process.env.APP_KEYWORDS || "somethings";
    const year = new Date().getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
    const company = process.env.COMPANY_NAME || "GeekyAnts";
    const description =
      process.env.APP_DESCRIPTION || "Here goes the app description";

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
    const apiPrefix = process.env.API_PREFIX || "api";
    const apiVersion = process.env.API_VERSION || "v0";

    // const logDays = process.env.LOG_DAYS || 10;

    // const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
    // const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;

    // const redisHttpPort = process.env.REDIS_QUEUE_PORT || 6379;
    // const redisHttpHost = process.env.REDIS_QUEUE_HOST || "127.0.0.1";
    // const redisPrefix = process.env.REDIS_QUEUE_DB || "q";
    // const redisDB = process.env.REDIS_QUEUE_PREFIX || 3;

    const db_name = process.env.DB_NAME;
    const db_username = process.env.DB_USERNAME;
    const db_password = process.env.DB_PASSWORD;

    return {
      //db details
      db_name,
      db_username,
      db_password,

      appSecret,
      apiPrefix,
      apiVersion,

      company,
      copyright,
      description,

      isCORSEnabled,
      jwtExpiresIn,
      keywords,
      //   logDays,
      maxUploadLimit,
      maxParameterLimit,
      // mongooseUrl,
      name,
      port,
      //   redisDB,
      //   redisHttpPort,
      //   redisHttpHost,
      //   redisPrefix,
      url,
      //   queueMonitor,
      //   queueMonitorHttpPort,
    };
  }
  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}
