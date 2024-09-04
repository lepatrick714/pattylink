"use strict";
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
const passport_local_1 = require("passport-local");
const User_1 = __importDefault(require("../../models/User")); // Ensure this is the correct path
const Log_1 = __importDefault(require("../../middlewares/Log"));
class Local {
    static init(passport) {
        passport.use(new passport_local_1.Strategy({ usernameField: 'email' }, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
            Log_1.default.info(`Email is ${email}`);
            Log_1.default.info(`Password is ${password}`);
            try {
                // Find user by email
                const user = yield User_1.default.findOne({ where: { email: email.toLowerCase() } });
                if (!user) {
                    return done(null, false, { message: `E-mail ${email} not found.` });
                }
                if (!user.password) {
                    return done(null, false, {
                        message: `E-mail ${email} was not registered with us using any password. Please use the appropriate providers to Log-In again!`,
                    });
                }
                Log_1.default.info('Comparing password now!');
                // Compare password
                const isMatch = yield user.comparePassword(password);
                if (isMatch) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Invalid E-mail or password.' });
                }
            }
            catch (err) {
                Log_1.default.info(`Error occurred: ${err}`);
                return done(err);
            }
        })));
    }
}
exports.default = Local;
//# sourceMappingURL=Local.js.map