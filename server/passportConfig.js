import LocalStrategy1 from "passport-local";
import { pool } from "./config/database.js";
import bcrypt from "bcryptjs";
import { error } from "console";

const LocalStrategy = LocalStrategy1.Strategy;

const authenticateUser = (email, password, done) => {
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.rows.length > 0) {
        // Fixed typo here
        const user = results.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null, user); //save user to session
          } else {
            return done(null, false, { error: "Password is not correct" });
          }
        });
      } else {
        return done(null, false, { error: "Email is not registered" });
      }
    }
  );
};

const initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // Corrected field name
        passwordField: "password", // Corrected field name
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    //store user id in session
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    //get user with id
    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
      // Fixed typo here
      if (err) {
        throw err;
      }
      return done(null, results.rows[0]); //put user in session
    });
  });
};

export default initializePassport;
