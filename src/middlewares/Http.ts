/**
 * Defines all the requisites in HTTP middleware.
 */

import cors from "cors";
import { Application } from "express";
import flash from "connect-flash";
import compress from "compression";
import bodyParser from "body-parser";
import session from "express-session";
import { check } from "express-validator";

import Log from "./Log";
import Locals from "../providers/Locals";
import Passport from "../providers/Passport";

class Http {
  public static mount(_express: Application): Application {
    Log.info("Booting the 'HTTP' middleware...");

    // Enables the request body parser
    _express.use(
      bodyParser.json({
        limit: Locals.config().maxUploadLimit,
      })
    );

    _express.use(
      bodyParser.urlencoded({
        limit: Locals.config().maxUploadLimit,
        parameterLimit: Locals.config().maxParameterLimit,
        extended: false,
      })
    );

    // Disable the x-powered-by header in response
    _express.disable("x-powered-by");

    // Enables the request payload validator
    _express.use(check());

    // Enables the request flash messages
    _express.use(flash());

    /**
     * Enables the session store
     *
     * Note: You can also add redis-store
     * into the options object.
     */
    const options = {
      resave: true,
      saveUninitialized: true,
      secret: Locals.config().appSecret,
      cookie: {
        maxAge: 1209600000, // two weeks (in ms)
      },
      // TODO add mysql store
    };

    _express.use(session(options));

    // Enables the CORS
    _express.use(cors());

    // Enables the "gzip" / "deflate" compression for response
    _express.use(compress());

    // Loads the passport configuration
    _express = Passport.mountPackage(_express);

    return _express;
  }
}

export default Http;
