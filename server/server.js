import express from "express";
const server = express();

import expressSession from "express-session";
import "dotenv/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import "./auth/passport.js";
import cors from "cors";

import routes from "./routes/index.js";

//---- MIDDLEWARE FUNCTIONS ----
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
server.use(cors(corsOptions));

//--- PRISMA SESSION SETUP ---
server.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

//---- AUTHENTICATION PASSPORTJS ----
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

//---- ROUTES ----
server.use("/users", routes.users);
server.use("/session", routes.session);
server.use("/files", routes.files);
server.use("/folders", routes.folders);

//---- SERVER ----
server.listen(process.env.SERVER_PORT, () => {
  console.log("server online on: " + process.env.SERVER_PORT);
});
