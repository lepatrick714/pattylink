"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = __importDefault(require("./Locals"));
const Log_1 = __importDefault(require("../middlewares/Log"));
const sequelize_1 = require("sequelize");
class Database {
    // Initialize your database pool
    static init() {
        const dbName = Locals_1.default.config().db_name;
        const username = Locals_1.default.config().db_username;
        const password = Locals_1.default.config().db_password;
        // Create a new Sequelize instance
        this.sequelize = new sequelize_1.Sequelize(dbName, username, password, {
            host: 'localhost',
            dialect: 'mysql', // or 'mariadb', 'postgres', etc.
            logging: false, // Disable logging or provide a custom logger function
            dialectOptions: {
            // Optional: additional options for the dialect
            },
        });
        // Test the connection
        this.sequelize
            .authenticate()
            .then(() => {
            Log_1.default.info("Connected to MySQL server at: ");
        })
            .catch((error) => {
            Log_1.default.error(`Failed to connect to the MySQL server!! Error ${error}`);
            throw error;
        });
    }
    // Get the Sequelize instance
    static getInstance() {
        if (!this.sequelize) {
            this.init();
        }
        return this.sequelize;
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map