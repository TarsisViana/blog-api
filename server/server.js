import express from "express";
const server = express();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import "dotenv/config";
import passport from "passport";
import "./auth/passport.js";
import cors from "cors";

import routes from "./routes/index.js";

//---- MIDDLEWARE FUNCTIONS ----
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//secure later*****
server.use(cors());

//---- ROUTES ----
server.use("/users", routes.users);
server.use("/files", routes.files);
server.use("/folders", routes.folders);
server.use("/posts", routes.posts);
server.use("/auth", routes.auth);
server.use(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

//---- SERVER ----
server.listen(process.env.SERVER_PORT, () => {
  console.log("server online on: " + process.env.SERVER_PORT);
});
