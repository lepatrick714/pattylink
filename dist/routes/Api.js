"use strict";
/** Define all publicly exposed endpoints reserved for crud operations */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppController_1 = require("../controllers/AppController");
const router = (0, express_1.Router)();
router.get('/', AppController_1.default.index);
exports.default = router;
//# sourceMappingURL=Api.js.map