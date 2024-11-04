import { Router } from "express";
import { isAuth } from "../auth/auth-middleware.js";
import {
  createNewFolder,
  getFolders,
} from "../controllers/folder-controllers.js";

const router = Router();

//make route protected
router.use(isAuth);

router.get("/", getFolders);

router.post("/new", createNewFolder);

export default router;
