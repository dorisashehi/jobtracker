import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bycrypt from "bcryptjs";
import { pool } from "./config/database.js";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import "./passportConfig.js";
import GoogleStrategyModule from "passport-google-oauth20";
import { ensureAuthenticated } from "./middlewares/auth.js";
import ApplicationsRouter from "./routes/Applications.js";
import router from "./routes/Applications.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL (React)
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.post("/users/signup", async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  let hashedPassword = await bycrypt.hash(password, 10);

  pool.query("SELECT * FROM users WHERE email=$1", [email], (err, results) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (results.rows.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      pool.query(
        "INSERT INTO users(username, email,password) VALUES($1,$2,$3) RETURNING id, password",
        [username, email, hashedPassword],
        (err, results) => {
          if (err) {
            throw err;
          }
          //req.flush("success_msg", "You are now registered and can log in");
          res.status(201).json({ success: true, message: "User created" });
        }
      );
    }
  });
});

// POST route for login
app.post("/users/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong during authentication." });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: info?.error || "Authentication failed" });
    }

    req.login(user, (err) => {
      //login session for the user
      if (err) {
        return res.status(500).json({ error: "Failed to create session" });
      }

      // Send success response
      return res.status(200).json({
        success: true,
        user: user,
      });
    });
  })(req, res, next);
});

app.get("/users/login", ensureAuthenticated, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});

app.get("/users/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong with logout." });
    }

    res.status(204).send();
  });
});

app.get("/users/authuser", ensureAuthenticated, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});

const GoogleStrategy = GoogleStrategyModule.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await pool.query(
          "SELECT * FROM users WHERE googleid = $1",
          [profile.id]
        );

        const usrObj = user.rows[0];
        console.log(profile);

        if (usrObj) {
          return done(null, usrObj);
        }

        const newUser = await pool.query(
          "INSERT INTO users(googleid, username, email) VALUES($1, $2, $3) RETURNING id, googleid, username, email",
          [profile.id, profile.displayName, profile.emails[0].value]
        );

        done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: false }),
  (req, res) => {
    console.log(req.user);
    //res.redirect("http://localhost:5173/dashboard");
  }
);

app.get("/login/success", (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json({ success: true, user: req.user });
  }
});

app.use("/api", ApplicationsRouter);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
