"use strict";
/**
 * Defines the passport config
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const Local_1 = __importDefault(require("../services/strategies/Local"));
// import GoogleStrategy from "../services/strategies/Google";
// import TwitterStrategy from "../services/strategies/Twitter";
const User_1 = __importDefault(require("../models/User"));
const Log_1 = __importDefault(require("../middlewares/Log"));
class Passport {
    mountPackage(_express) {
        _express = _express.use(passport_1.default.initialize());
        _express = _express.use(passport_1.default.session());
        passport_1.default.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
            const pk_id = yield User_1.default.findByPk(id);
            if (User_1.default) {
                console.log('User found:', User_1.default);
            }
            else {
                console.log('User not found');
            }
        }));
        this.mountLocalStrategies();
        return _express;
    }
    mountLocalStrategies() {
        try {
            Local_1.default.init(passport_1.default);
            // GoogleStrategy.init(passport);
            // TwitterStrategy.init(passport);
        }
        catch (_err) {
            Log_1.default.error(_err.stack);
        }
    }
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("errors", { msg: "Please Log-In to access any further!" });
        return res.redirect("/login");
    }
    isAuthorized(req, res, next) {
        const provider = req.path.split("/").slice(-1)[0];
        const token = req.user.tokens.find((token) => token.kind === provider);
        if (token) {
            return next();
        }
        else {
            return res.redirect(`/auth/${provider}`);
        }
    }
}
exports.default = new Passport();
//# sourceMappingURL=Passport.js.map