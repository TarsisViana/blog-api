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
server.post("/users", (req, res, next) => {
  console.log("hey");
});
server.use("/users", routes.users);
server.use("/posts", routes.posts);
server.use("/auth", routes.auth);
server.use("/protected", routes.protectedRouter);

//---- SERVER ----
server.listen(process.env.SERVER_PORT, () => {
  console.log("server online on: " + process.env.SERVER_PORT);
});
