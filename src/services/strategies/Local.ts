
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/User'; // Ensure this is the correct path
import Log from '../../middlewares/Log';

class Local {
  public static init(passport: any): void {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done: Function) => {
        Log.info(`Email is ${email}`);
        Log.info(`Password is ${password}`);

        try {
          // Find user by email
          const user = await User.findOne({ where: { email: email.toLowerCase() } });

          if (!user) {
            return done(null, false, { message: `E-mail ${email} not found.` });
          }

          if (!user.password) {
            return done(null, false, {
              message: `E-mail ${email} was not registered with us using any password. Please use the appropriate providers to Log-In again!`,
            });
          }

          Log.info('Comparing password now!');

          // Compare password
          const isMatch = await user.comparePassword(password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid E-mail or password.' });
          }
        } catch (err) {
          Log.info(`Error occurred: ${err}`);
          return done(err);
        }
      })
    );
  }
}

export default Local;