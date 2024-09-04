"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Locals_1 = __importDefault(require("./Locals"));
const Routes_1 = __importDefault(require("./Routes"));
const index_1 = __importDefault(require("../middlewares/index"));
const Handler_1 = __importDefault(require("../exception/Handler"));
class Express {
    constructor() {
        console.log("Express :: Booting...");
        this.express = (0, express_1.default)();
        this.mountDotEnv();
        this.mountMiddlewares();
        this.mountRoutes();
    }
    /**
     * Mounts all the defined middlewares
     */
    mountMiddlewares() {
        this.express = index_1.default.init(this.express);
    }
    /**
     * Mounts all the defined routes
     */
    mountRoutes() {
        this.express = Routes_1.default.mountApi(this.express);
    }
    /**
     * Starts the express server
     */
    init() {
        const port = Locals_1.default.config().port;
        // Registering Exception / Error Handlers
        this.express.use(Handler_1.default.logErrors);
        this.express.use(Handler_1.default.clientErrorHandler);
        this.express.use(Handler_1.default.errorHandler);
        this.express = Handler_1.default.notFoundHandler(this.express);
        // Start the server on the specified port
        this.express
            .listen(port, () => {
            return console.log("\x1b[33m%s\x1b[0m", `Server :: Running @ 'http://localhost:${port}'`);
        })
            .on("error", (_error) => {
            return console.log("Error: ", _error.message);
        });
    }
    mountDotEnv() {
        this.express = Locals_1.default.init(this.express);
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map