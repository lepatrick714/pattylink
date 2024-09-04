"use strict";
/** Default AppController */
Object.defineProperty(exports, "__esModule", { value: true });
class AppController {
    /** Default index method */
    static index(_req, res) {
        res.json({ message: "Hello World", success: true });
    }
}
exports.default = AppController;
//# sourceMappingURL=AppController.js.map