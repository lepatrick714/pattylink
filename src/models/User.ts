import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import Database from "../providers/Database"; // Import your configured Sequelize instance

export interface Tokens {
  kind: String;
  accessToken: String;
  tokenSecret?: String;
}

export class IUserModel extends Model {
  public email: string;
  public password: string;
  public passwordResetToken: string;
  public passwordResetExpires: string;
  public facebook: string;
  public twitter: string;
  public google: string;
  public github: string;
  public instagram: string;
  public linkedin: string;
  public tokens: string;
  public steam: string;
  public fullname: string;
  public gender: string;
  public geolocation: string;
  public website: string;
  public picture: string;

  public async comparePassword(inputtedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputtedPassword, this.password);
  }
}

// Define the User Schema
const User = Database.define<IUserModel>(
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

export default User;
