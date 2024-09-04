"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("./Log"));
class Views {
    static mount(_express) {
        Log_1.default.info('Booting the \'Views\' middleware...');
        // _express.set("view options", {layout: false});
        _express.set('view engine', 'html');
        // _express.set('view options', { pretty: true });
        // _express.locals.pretty = true;
        return _express;
    }
}
exports.default = Views;
//# sourceMappingURL=Views.js.map