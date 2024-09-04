"use strict";
/**
 * Register your Express middlewares
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CORS_1 = __importDefault(require("./CORS"));
const Http_1 = __importDefault(require("./Http"));
const Views_1 = __importDefault(require("./Views"));
// import Statics from './Statics';
// import CsrfToken from "./CsfToken";
// import StatusMonitor from './StatusMonitor';
const Locals_1 = __importDefault(require("../providers/Locals"));
class MiddlewareApp {
    static init(_express) {
        // Check if CORS is enabled
        if (Locals_1.default.config().isCORSEnabled) {
            // Mount CORS middleware
            _express = CORS_1.default.mount(_express);
        }
        // Mount basic express apis middleware
        _express = Http_1.default.mount(_express);
        // Mount csrf token verification middleware
        // _express = CsrfToken.mount(_express);
        // Mount view engine middleware
        console.log("Views.mount(_express)", Views_1.default.mount(_express));
        _express = Views_1.default.mount(_express);
        // Mount statics middleware
        // _express = Statics.mount(_express);
        // Mount status monitor middleware
        // _express = StatusMonitor.mount(_express);
        return _express;
    }
}
exports.default = MiddlewareApp;
//# sourceMappingURL=index.js.map