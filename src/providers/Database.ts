import Locals from "./Locals";
import Log from "../middlewares/Log";
import { Sequelize } from "sequelize";

class Database {
  private static sequelize: Sequelize;

  // Initialize your database pool
  public static init(): void {
    const dbName = Locals.config().db_name;
    const username = Locals.config().db_username;
    const password = Locals.config().db_password;

    // Create a new Sequelize instance
    this.sequelize = new Sequelize(dbName, username, password, {
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
        Log.info("Connected to MySQL server at: ");
      })
      .catch((error) => {
        Log.error(`Failed to connect to the MySQL server!! Error ${error}`);
        throw error;
      });
  }

  // Get the Sequelize instance
  public static getInstance(): Sequelize {
    if (!this.sequelize) {
      this.init();
    }
    return this.sequelize;
  }
}

export default Database.getInstance();
