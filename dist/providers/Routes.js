"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../middlewares/Log"));
const Api_1 = __importDefault(require("./../routes/Api"));
class Routes {
    mountApi(_express) {
        // const apiPrefix = Locals.config().apiPrefix;
        Log_1.default.info("Routes :: Mounting API Routes...");
        // return _express.use(`/${apiPrefix}`, apiRouter);
        return _express.use(`/`, Api_1.default);
    }
}
exports.default = new Routes();
//# sourceMappingURL=Routes.js.map