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
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Locals_1 = __importDefault(require("../providers/Locals"));
const dbName = Locals_1.default.config().db_name;
const username = Locals_1.default.config().db_username;
const password = Locals_1.default.config().db_password;
// Create a new Sequelize instance
const sq = new sequelize_1.Sequelize(dbName, username, password, {
    host: "localhost",
    dialect: "mysql", // or 'mariadb', 'postgres', etc.
    logging: false, // Disable logging or provide a custom logger function
    dialectOptions: {
    // Optional: additional options for the dialect
    },
});
// Define the model
// class User extends Model<IUserModel> implements IUserModel {
//   public username!: string;
//   public email!: string;
//   public password!: string;
//   // Define the custom method
//   public async comparePassword(password: string): Promise<boolean> {
//     return bcrypt.compare(password, this.password);
//   }
// }
// Define the User Schema
const User = sq.define("user", {
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    passwordResetToken: { type: sequelize_1.DataTypes.STRING },
    passwordResetExpires: sequelize_1.DataTypes.DATE,
    facebook: { type: sequelize_1.DataTypes.STRING },
    twitter: { type: sequelize_1.DataTypes.STRING },
    google: { type: sequelize_1.DataTypes.STRING },
    github: { type: sequelize_1.DataTypes.STRING },
    instagram: { type: sequelize_1.DataTypes.STRING },
    linkedin: { type: sequelize_1.DataTypes.STRING },
    steam: { type: sequelize_1.DataTypes.STRING },
    tokens: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON) },
    fullname: { type: sequelize_1.DataTypes.STRING },
    gender: { type: sequelize_1.DataTypes.STRING },
    geolocation: { type: sequelize_1.DataTypes.STRING },
    website: { type: sequelize_1.DataTypes.STRING },
    picture: { type: sequelize_1.DataTypes.STRING },
}, {
    tableName: "users",
    timestamps: true,
});
User.beforeSave((user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.changed("password")) {
        return;
    }
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
    }
    catch (err) {
        throw new Error("Error hashing password");
    }
}));
// // Compare the passed password with the value in the database
// export const comparePassword = async (candidatePassword: String) => {
//   return await bcrypt.compare(candidatePassword, this.password);
// };
exports.default = User;
//# sourceMappingURL=User.js.map