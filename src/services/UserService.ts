import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";

class UserService {
  public static async ValidateUserBody(req: Request, resp: Response) {
    req.assert("email", "E-mail cannot be blank").notEmpty();
    req.assert("email", "E-mail is not valid").isEmail();
    req.assert("password", "Password cannot be blank").notEmpty();
    req
      .assert("password", "Password length must be atleast 8 characters")
      .isLength({ min: 8 });
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    // If you have any errors, reject the request.
    const errors = req.validationErrors();
    if (errors) {
      return resp.json({
        errors,
      });
    }
  }

  public static register(req, resp): Promise<object> {
    return new Promise((resolve, reject) => {
      // Your logic here
    });
  }

  public static async login(req, resp): Promise<string> {
    // Otherwise check for the user
    const _email = req.body.email.toLowerCase();
    const _password = req.body.password;

    try {
      const user = await User.findOne({ where: { email: _email } });
      const isMatch = await user.comparePassword(_password);

      if (isMatch) {
        // Move to jwt service
        const token = jwt.sign(
          { email: _email, password: _password },
          resp.locals.app.appSecret,
          { expiresIn: resp.locals.app.jwtExpiresIn * 60 }
        );

        // Hide protected columns
        user.tokens = undefined;
        user.password = undefined;

        return resp.json({
          user,
          token,
          token_expires_in: resp.locals.app.jwtExpiresIn * 60,
        });
      } else {
        return resp.json({
          error: "Password does not match!",
        });
      }
    } catch (err) {
      return resp.json({
        error: err,
      });
    }
  }
}

export default UserService;
