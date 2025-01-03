import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bycrypt from "bcryptjs";
import { pool } from "./config/database.js";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import initializePassport from "./passportConfig.js";

initializePassport(passport);

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
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

app.get("/users/signup", (req, res) => {
  res.json({ messsage: "Sign up page" });
});

app.post("/users/signup", async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  let hashedPassword = await bycrypt.hash(password, 10);
  console.log(hashedPassword);

  pool.query("SELECT * FROM users WHERE email=$1", [email], (err, results) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (results.rows.length > 0) {
      console.log("Email already exists");
      return res.status(400).json({ error: "Email already exists" });
    } else {
      pool.query(
        "INSERT INTO users(username, email,password) VALUES($1,$2,$3) RETURNING id, password",
        [username, email, hashedPassword],
        (err, results) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log(results.rows);
          //req.flush("success_msg", "You are now registered and can log in");
          res.status(200).json({ message: "User registered succesfully!" });
        }
      );
    }
  });
});

app.get("/users/login", (req, res) => {
  res.json({ messsage: "Log In page" });
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: false, //to show eeror messages if user is not uthenticated
  })
);

app.get("/users/dashboard", (req, res) => {
  console.log("yesss");
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
