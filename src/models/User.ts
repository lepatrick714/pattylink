import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import Database from "../providers/Database"; // Import your configured Sequelize instance

export interface Tokens {
  kind: String;
  accessToken: String;
  tokenSecret?: String;
}

export interface IUser {
  email: String;
  password: String;
  passwordResetToken: String;
  passwordResetExpires: Date;

  facebook: String;
  twitter: String;
  google: String;
  github: String;
  instagram: String;
  linkedin: String;
  tokens: Tokens[];
  steam: String;

  fullname: String;
  gender: String;
  geolocation: String;
  website: String;
  picture: String;
}

export interface IUserModel extends Model, IUser {
  comparePassword(password: string): Promise<boolean>;
  validPassword(password: String, cb: any): String;
  gravatar(_size: number): String;
}

import Locals from "../providers/Locals";

const dbName = Locals.config().db_name;
const username = Locals.config().db_username;
const password = Locals.config().db_password;

// Create a new Sequelize instance
const sq = new Sequelize(dbName, username, password, {
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
const User = sq.define<IUserModel>(
  "user",
  {
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    passwordResetToken: { type: DataTypes.STRING },
    passwordResetExpires: DataTypes.DATE,

    facebook: { type: DataTypes.STRING },
    twitter: { type: DataTypes.STRING },
    google: { type: DataTypes.STRING },
    github: { type: DataTypes.STRING },
    instagram: { type: DataTypes.STRING },
    linkedin: { type: DataTypes.STRING },
    steam: { type: DataTypes.STRING },
    tokens: { type: DataTypes.ARRAY(DataTypes.JSON) },

    fullname: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    geolocation: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    picture: { type: DataTypes.STRING },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

User.beforeSave(async (user) => {
  if (!user.changed("password")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (err) {
    throw new Error("Error hashing password");
  }
});


// // Compare the passed password with the value in the database
// export const comparePassword = async (candidatePassword: String) => {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

export default User;
