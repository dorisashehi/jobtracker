import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import "./passportConfig.js";
import ApplicationsRouter from "./routes/Applications.js";
import AuthenticationRouter from "./routes/Auth.js";

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

app.use("/auth", AuthenticationRouter);
app.use("/api", ApplicationsRouter);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
