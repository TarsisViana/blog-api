import { Router } from "express";
const router = Router();

import { newUser, getSessionUser } from "../controllers/user-controllers.js";

router.get("/", getSessionUser);

//Register new user
router.post("/", newUser);

export default router;
