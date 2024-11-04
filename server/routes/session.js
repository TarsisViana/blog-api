import { Router } from "express";
const router = Router();

import passport from "passport";

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
    successMessage: true,
  }),
  (req, res) => {
    res.send({ message: "test" });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.json({ message: "user logged out" });
});

export default router;
