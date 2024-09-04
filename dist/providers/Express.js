"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Locals_1 = require("./Locals");
const Handler_1 = require("../exception/Handler");
class Express {
    constructor() {
        this.express = express();
        this.mountDotEnv();
        // this.mountMiddlewares();
        // this.mountRoutes();
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