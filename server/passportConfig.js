import LocalStrategyModule from "passport-local";
import { pool } from "./config/database.js";
import passport from "passport";
import bcrypt from "bcryptjs";

const LocalStrategy = LocalStrategyModule.Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);

        const usrObj = user.rows[0];

        if (!usrObj) {
          return done(null, false, { error: "Incorrect email" });
        }

        const isMatch = await bcrypt.compare(password, usrObj.password);

        if (!isMatch) {
          return done(null, false, { error: "Incorrect password" });
        }

        done(null, usrObj);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  //run automatically when user logged in
  //store user id in session
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  //run automatically when user logged in
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (!user) {
      return done(new Error("User not found"));
    }

    done(null, user.rows[0]);
  } catch (error) {
    done(error);
  }
});
