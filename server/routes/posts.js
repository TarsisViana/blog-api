import { Router } from "express";
import multer from "multer";
import passport from "passport";
import {
  createPost,
  deletePost,
  getArticles,
  getPostFile,
  getPostList,
} from "../controllers/post-controllers.js";

const router = Router();
const upload = multer({ dest: "./uploads/" });

//---- GET ROUTES ----
router.get("/article/:articleId", getPostFile);
router.get("/post-list", getPostList);
router.get(
  "/article-list",
  passport.authenticate("jwt", { session: false }),
  getArticles
);

//---- POST ROUTES ----
router.post(
  "/new-upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("upload"),
  createPost
);

//---- DELETE ROUTES ----
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

export default router;
