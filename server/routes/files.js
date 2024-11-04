import { Router } from "express";
import multer from "multer";
import { isAuth } from "../auth/auth-middleware.js";
import { createNewFile, getFiles } from "../controllers/file-controllers.js";

const router = Router();
const upload = multer({ dest: "./uploads/" });

//make route protected
router.use(isAuth);

router.get("/", getFiles);

router.post("/upload", upload.single("upload"), createNewFile);

export default router;
