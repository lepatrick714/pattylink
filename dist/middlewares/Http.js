"use strict";
/**
 * Defines all the requisites in HTTP middleware.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const express_validator_1 = require("express-validator");
const Log_1 = __importDefault(require("./Log"));
const Locals_1 = __importDefault(require("../providers/Locals"));
const Passport_1 = __importDefault(require("../providers/Passport"));
class Http {
    static mount(_express) {
        Log_1.default.info("Booting the 'HTTP' middleware...");
        // Enables the request body parser
        _express.use(body_parser_1.default.json({
            limit: Locals_1.default.config().maxUploadLimit,
        }));
        _express.use(body_parser_1.default.urlencoded({
            limit: Locals_1.default.config().maxUploadLimit,
            parameterLimit: Locals_1.default.config().maxParameterLimit,
            extended: false,
        }));
        // Disable the x-powered-by header in response
        _express.disable("x-powered-by");
        // Enables the request payload validator
        _express.use((0, express_validator_1.check)());
        // Enables the request flash messages
        _express.use((0, connect_flash_1.default)());
        /**
         * Enables the session store
         *
         * Note: You can also add redis-store
         * into the options object.
         */
        const options = {
            resave: true,
            saveUninitialized: true,
            secret: Locals_1.default.config().appSecret,
            cookie: {
                maxAge: 1209600000, // two weeks (in ms)
            },
            // TODO add mysql store
        };
        _express.use((0, express_session_1.default)(options));
        // Enables the CORS
        _express.use((0, cors_1.default)());
        // Enables the "gzip" / "deflate" compression for response
        _express.use((0, compression_1.default)());
        // Loads the passport configuration
        _express = Passport_1.default.mountPackage(_express);
        return _express;
    }
}
exports.default = Http;
//# sourceMappingURL=Http.js.map