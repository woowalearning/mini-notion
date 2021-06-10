import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import hpp from "hpp";
import helmet from "helmet";
import { setup } from "./passport";

const ensureAuthenticated = function (req: any, res: any, next: any) {
  console.log("req.isAuthenticated()", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const app = express();
app.set("PORT", process.env.PORT || 3000);
const prod = process.env.NODE_ENV === "production";

if (prod) {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: "mini-notion",
  cookie: {
    httpOnly: true,
  },
};

if (prod) {
  (sessionOption.cookie as any).secure = true;
  (sessionOption.cookie as any).proxy = true;
}
app.use(session(sessionOption as any));

setup(app);

app.get("/", ensureAuthenticated, (req, res, next) => {
  res.send("OK");
});

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(app.get("PORT"), () => {
  console.log(`listening on port ${app.get("PORT")}`);
});
