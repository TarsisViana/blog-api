import { Router } from "express";
import multer from "multer";
import passport from "passport";
import {
  createPost,
  getPostFile,
  getPostList,
} from "../controllers/post-controllers.js";

const router = Router();
const upload = multer({ dest: "./uploads/" });

router.get("/article/:articleId", getPostFile);

router.get("/post-list", getPostList);

//create article and save md file
router.post(
  "/new-upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("upload"),
  createPost
);

export default router;
