import { Router } from "express";
const router = Router();

import { newUser, getSessionUser } from "../controllers/user-controllers.js";

router.get("/", getSessionUser);

//Register new user
router.post("/register", newUser);

export default router;
